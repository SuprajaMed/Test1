import { loginToTheApplication } from '../../utilities/loginUtils';
import { verifyExists, clickAction, typeText, typeDropDwn, getText } from '../../utilities/commonUtils';
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
  it('reset all filters', () => {
    clickAction({ locator: searchButton });
    cy.wait(10000)
    clickAction({ locator: ':nth-child(1) > .accordion-header > .accordion-toggle' });
    typeText({ locator: '#Search_keyword', dataText: testingKeyword });
    clickAction({ locator: ':nth-child(2) > .accordion-header > .accordion-toggle' });
    clickAction({ locator: "[class='checkbox-wrapper-checkbox'][value='sts_comp']" });
    clickAction({ locator: "[class='checkbox-wrapper-checkbox'][value='sts_basic']" })
    clickAction({ locator: searchButtonInProjectsPage });
    cy.wait(10000)
    verifyExists({ element: keyWordTitle });
    verifyExists({ element: completedBadge });

    //Reset all filters
    clickAction({ locator: '.mt-4 > span' })
    cy.wait(5000)
    clickAction({ locator: '.result > p' })
  });
  it('Refresh page', () => {
    typeText({ locator: keywordType, dataText: testingKeyword });
    clickAction({ locator: searchButton });
    cy.wait(10000)
    cy.get('.result > p').should('have.text', "Displaying 5 projects");
    cy.reload().wait(3000);
    cy.get('.result > p').should('have.text', "Displaying 200 projects");
    cy.wait(5000);
    cy.get('.checkbox-wrapper-icon > .svg-inline--fa').click();
  });
  it('Png and Jpg image', () => {
    clickAction({ locator: searchButton });
    cy.wait(5000);
    cy.get('.checkbox-wrapper-icon > .svg-inline--fa').click();
    clickAction({ locator: searchButtonInProjectsPage });
    cy.wait(9000)
    cy.get("[id='testing_1111-0']").wait(7000).then(($img) => {
      const imgSrc = $img.attr('src');
      expect(imgSrc).to.match(/\.png$/);
    });
    cy.wait(5000);
    cy.get('[data-testid="label-photo_only-y"] > .checkbox-wrapper > .checkbox-wrapper-icon').click();
    clickAction({ locator: searchButtonInProjectsPage });
    cy.wait(9000)
    cy.get('#testing1-0').wait(5000).then(($img) => {
      const imgSrc = $img.attr('src');
      expect(imgSrc).to.match(/\.jpg$/);
    });
  });

});