import { loginToTheApplication } from '../../utilities/loginUtils';
import { verifyExists, clickAction, typeText, typeDropDwn } from '../../utilities/commonUtils';
import { appUrl, WebsiteLogo } from '../../PageObjects/loginPage/loginPage.json';
import {
  keywordType, searchButton, keyWordTitle, seeksGlobalGrantPartnersCheckbox, seeksGlobalGrantPartnersBadge, seeksOtherPartnersCheckbox,
  seeksOtherPartnersBadge, inProgressCheckbox, inProgressBadge, selectCheckbox, indiaLocator, indiaPlaceHolder, distLocator, distPlaceHolder, searchButtonInProjectsPage,
  completedCheckbox, completedBadge, campaignsHeader, firstCampaign, indiaLocatorInProjectsPage, projectResultCount, noReultsFound, searchButton2, basicBadge, fifthCampaign, basicCheckbox, secondCampaign, thirdCampaign, fourthCampaign
} from '../../PageObjects/homePage/homePage.json';
import { testingKeyword } from '../../testData/homePage.json';

describe('button', () => {
  beforeEach(() => {
    cy.visit(appUrl);
    verifyExists({ element: WebsiteLogo });
  });

  it('KeyWord', () => {
    typeText({ locator: keywordType, dataText: testingKeyword });
    clickAction({ locator: searchButton });
    cy.wait(10000)
    verifyExists({ element: keyWordTitle });
  });

  it('Checkboxes', () => {
    clickAction({ locator: seeksGlobalGrantPartnersCheckbox });
    clickAction({ locator: searchButton });
    cy.wait(10000)
    verifyExists({ element: seeksGlobalGrantPartnersBadge });

    cy.go('back');
    clickAction({ locator: seeksOtherPartnersCheckbox });
    clickAction({ locator: searchButton });
    cy.wait(10000)
    verifyExists({ element: seeksOtherPartnersBadge });

    cy.go('back');
    clickAction({ locator: inProgressCheckbox });
    clickAction({ locator: searchButton });
    cy.wait(10000)
    verifyExists({ element: inProgressBadge });

    cy.go('back');
    clickAction({ locator: completedCheckbox });
    clickAction({ locator: searchButton });
    cy.wait(15000)
    verifyExists({ element: completedBadge });

  });

  it('Campaigns', () => {
    verifyExists({ element: campaignsHeader });
    verifyExists({ element: firstCampaign });
    verifyExists({ element: secondCampaign });
    verifyExists({ element: thirdCampaign });
    verifyExists({ element: fourthCampaign });
    verifyExists({ element: fifthCampaign });

    cy.get(selectCheckbox).eq(0).click();
    cy.then(() => {
      cy.get(indiaLocator).click();
      clickAction({ locator: searchButton });
      cy.wait(15000)
      verifyExists({ element: indiaPlaceHolder });
    })

    cy.go('back');
    cy.get(selectCheckbox).eq(1).click();
    cy.then(() => {
      cy.get(distLocator).click();
      clickAction({ locator: searchButton });
      verifyExists({ element: distPlaceHolder })
    })
  });

  it.only('Location', () => {
    cy.get(selectCheckbox).eq(0).click();
    cy.then(() => {
      cy.get(indiaLocator).click();
      clickAction({ locator: searchButton });
      cy.wait(15000)
      verifyExists({ element: indiaPlaceHolder });
    })
  })

  it('District', () => {
    cy.get(selectCheckbox).eq(1).click();
    cy.then(() => {
      cy.get(distLocator).click();
      clickAction({ locator: searchButton });
      verifyExists({ element: distPlaceHolder })
    })
  })

  it('Positive Flow', () => {
    typeText({ locator: keywordType, dataText: testingKeyword });
    clickAction({ locator: completedCheckbox });
    cy.get(selectCheckbox).eq(0).click();
    cy.then(() => {
      cy.get(indiaLocator).click();
      clickAction({ locator: searchButton });
      cy.wait(15000)
      verifyExists({ element: indiaPlaceHolder });
      verifyExists({ element: keyWordTitle });
      verifyExists({ element: completedBadge });
    });
    cy.wait(6000)
    //validation of Basic check box
    clickAction({ locator: basicCheckbox });
    clickAction({ locator: searchButton2 });
    cy.wait(6000)
    verifyExists({ element: basicBadge });
    // validation of 2 projects found
    cy.wait(3000);
    verifyExists({ element: projectResultCount });
  });

  it('Negative', () => {
    typeText({ locator: keywordType, dataText: 'spcuat' });
    clickAction({ locator: completedCheckbox });
    cy.get(selectCheckbox).eq(0).click();
    cy.then(() => {
      cy.get(indiaLocator).click();
      clickAction({ locator: searchButton });
      cy.wait(5000)
      verifyExists({ element: noReultsFound });
    });
  });

  it('search and reset all filters verify to exists', () => {
    typeText({ locator: keywordType, dataText: testingKeyword });
    clickAction({ locator: searchButton });
    verifyExists({ element: '[type="submit"]:eq(0)' })
    verifyExists({ element: '[type="submit"]:eq(1)' })
  });

  it('no results found', () => {
    typeText({ locator: keywordType, dataText: 'njnhnj' });
    clickAction({ locator: searchButton });
    verifyExists({ element: '[class="text-center mb-0 mt-0"]' });
    clickAction({ locator: '[data-icon="circle-xmark"]' });
    cy.then(() => {
      clickAction({ locator: searchButtonInProjectsPage });
      verifyExists({ element: '[class="snapshot-card"]:eq(0)' });
    })
  });
});