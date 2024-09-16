const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  numTestsKeptInMemory: 0,
  env: {
    IS_CYPRESS_HANDLING_NEW_TABS: true,
    environment: 'dev',
    createRuntimeStaticAssets: true,
    grepFilterSpecs: true,
    appUrl: {
      dev: '',
    },
  },
  // appUrl: 'https://www.lascana.com/',
  defaultCommandTimeout: 100000,
  execTimeout: 60000,
  taskTimeout: 60000,
  pageLoadTimeout: 100000,
  requestTimeout: 5000,
  responseTimeout: 30000,
  //numTestsKeptInMemory: 1,

  retries: {
    runMode: 1,
    openMode: 1,
  },

  e2e: {
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    specPattern: ['cypress/e2e/**/*.{js,jsx,ts,tsx}', 'cypress/bvt/**/*.{js,jsx,ts,tsx}'],
    setupNodeEvents (on, config) {
      //implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
        console.log('..browser ', launchOptions);
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-extensions');
          return launchOptions;
        }
        if (browser.name === 'electron') {
          launchOptions.preferences.webPreferences.webSecurity = false;
          return launchOptions;
        }
      });

      //task to check if file exist using node 'fs'
      const fs = require('fs');
      on('task', {
        readFileIfExists (filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8');
          }
          return null;
        },
      });
      //task to remove the downloads folder
      const { removeDirectory } = require('cypress-delete-downloads-folder');
      on('task', { removeDirectory });

      on('task', { azureSQL, mongoseDB, cosmosDB });

      //tasks to store (set) and retrieve (get) data during the scope of entire execution
      const runtimeDataObj = {};
      on('task', {
        setRuntimeValue: (params) => {
          const { key, value } = params;
          runtimeDataObj[key] = value;
          return value;
        },
        getRuntimeValue: (params) => {
          const { key } = params;
          return runtimeDataObj[key] || null;
        },
        getRuntimeDataObj: () => {
          return runtimeDataObj;
        },
      });

      const saveResultsAndSummary = (results) => {
        const fs = require('fs');
        const {
          startedTestsAt,
          endedTestsAt,
          totalDuration,
          totalSuites,
          totalTests,
          totalFailed,
          totalPassed,
          totalPending,
          totalSkipped,
          runUrl,
          config,
        } = results;

        const dashboardUrl = runUrl || 'Not Available';
        const env = config?.env?.environment;
        const mailBodyTxt = `Test Started: ${startedTestsAt}\nTest Ended: ${endedTestsAt}\nTest Duration: ${totalDuration}\nTotal Suite(Spec): ${totalSuites}\nTotal Tests: ${totalTests}\nTotal Failed: ${totalFailed}\nTotal Passed: ${totalPassed}\nTotal Pending: ${totalPending}\nTotal Skipped: ${totalSkipped}\nTest Environment: ${env}\nCypress Dashboard Url: ${dashboardUrl}`;

        fs.writeFile('cypress/results/json/results.json', JSON.stringify(results, null, 4), (err) => {
          if (err) console.log(err);
        });

        fs.writeFile('cypress/results/summary/summary.txt', mailBodyTxt, (err) => {
          if (err) console.log(err);
        });
      };

      on('after:run', (results) => {
        saveResultsAndSummary(results);
      });
      on('task', { azureSQL, mongoseDB, cosmosDB });
      require('cypress-grep/src/plugin')(config);
      return config;
    },
  },
});