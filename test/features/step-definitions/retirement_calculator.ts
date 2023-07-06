import { Given,When,Then } from "@wdio/cucumber-framework";
import chai from "chai"
import logger from "../../helper/logger.js"
import retirementHome from "../../page-objects/retirement.home.js";


Given(/^I am on the landing home page$/, async function(){
    await retirementHome.navigateTo("https://www.securian.com/insights-tools/retirement-calculator.html")
})
   
When(/^I look at the (.*) Calculator$/, async function(calculatorType){
    await retirementHome.verify_the_form(calculatorType)
})

When(/^I should "([^"]*)" the form with "([^"]*)" on the Calculator and click on "([^"]*")$/, async function(submit_type: string, fieldType: string, submitType: string){
    await retirementHome.submit_the_form(submit_type, fieldType, submitType)
})

Then(/^I should be able to see the success message displayed on the screen$/, async function(){
    await retirementHome.validate_the_form()
})

Then(/^I should be able to see the error message displayed for "([^"]*)" on the screen$/, async function(InvalidDataType: string){
    await retirementHome.verify_error_msg_form(InvalidDataType)
})

When(/^I toggle the social security benefits to "([^"]*)" on the calculator$/, async function(toggle_ssn: string){
    await retirementHome.toggle_ssn(toggle_ssn)
})

Then(/^I should see the social security fields "([^"]*)" on the calculator$/, async function(IsPresent: string){
    await retirementHome.verify_ssn_section(IsPresent)
})