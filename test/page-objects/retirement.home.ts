import Page from "./page.js"
import chai from "chai"
import logger from "../helper/logger.js"
import RequiredData from "../../data/RequiredData.json" assert { type: "json" };
import fs from 'fs'


class RetirementHomePage extends Page {
    constructor(){
        super()
    }

    /**Page Objects */

    get age_text_field()                  { return $(`#current-age`)}
    get retirement_age_text_field()       { return $(`#retirement-age`)}
    get cur_annaul_income_text_field()    { return $(`#current-income`)}
    get sp_annaul_income_text_field()     { return $(`#spouse-income`)}
    get cur_tot_sav_text_field()          { return $(`#current-total-savings`)}
    get cur_annual_sav_text_field()       { return $(`#current-annual-savings`)}
    get sav_increase_ratetext_field() { return $(`#savings-increase-rate`)}
    get social_benefits_no() { return $(`#include-social-container>ul>li>label`)}
    get social_benefits_yes() { return $(`#include-social-container>ul>li:nth-child(1)>label`)}
    get maritial_status_single() { return $(`#marital-status-ul>li:nth-child(1)>label`)}
    get maritial_status_married() { return $(`#marital-status-ul>li:nth-child(2)>label`)}
    get ssn_override() { return $(`#social-security-override`)}
    get calculate_btn() { return $(`#retirement-form > div:nth-child(7) > div:nth-child(2) > div.col-sm-4 > button`)}
    get results_text_msg() { return $(`#calculator-results-container > h3`)}
    get congrats_text_msg() { return $(`#result-message`)}
    get adjust_default_btn() { return $(`div[class= "dsg-alert-title-icon"]>ul>li>a`)}
    get additional_income_text_field() { return $(`#additional-income`)}
    get retirement_duration_text_field() { return $(`#retirement-duration`)}
    get include_inflation_text_field() { return $(`#include-inflation-container>ul>li:nth-child(1)>label`)}
    get retirement_annual_text_field() { return $(`#retirement-annual-income`)}
    get pre_retirement_roi_text_field() { return $(`#pre-retirement-roi`)}
    get post_retirement_roi_text_field() { return $(`#post-retirement-roi`)}
    get save_changes() { return $(`#default-values-form > div:nth-child(3) > div > div.col-sm-4 > button`)}
    get error_msg_on_calc() { return $(`#calculator-input-alert-desc`)}
    get age_error_msg() { return $(`#invalid-current-age-error`)}
    get retirement_error_msg() { return $(`#invalid-retirement-age-error`)}
    get current_income_error_msg() { return $(`#invalid-current-income-error`)}
    get total_savings_error_msg() { return $(`#invalid-current-total-savings-error`)}
    get annual_savings_error_msg() { return $(`#invalid-current-annual-savings-error`)}
    get savings_increase_error_msg() { return $(`#invalid-savings-increase-rate-error`)}
    get ssn_toggle() { return $$(`#include-social-container>ul>li>label`)}


    /**Page Actions */

    /**This function is to verify the pre-calculator present on the landing page */
    async verify_the_form(calculatorType: string){
        logger.info(`<<< verifying the calculator present on the home page >>>`)  
        try {
            this.checkElementExists(await this.age_text_field)
            this.checkElementExists(await this.retirement_age_text_field)
            this.checkElementExists(await this.cur_annaul_income_text_field)
            this.checkElementExists(await this.sp_annaul_income_text_field)
            this.checkElementExists(await this.cur_tot_sav_text_field)
            this.checkElementExists(await this.cur_annual_sav_text_field)
            this.checkElementExists(await this.sav_increase_ratetext_field)
            this.checkElementExists(await this.social_benefits_no)
            this.checkElementExists(await this.calculate_btn) 
        } catch (err) {
            err.message = `Pre-retirement calculator is not present on the home page`
            logger.error(err.message)
        }
        logger.info(`User has verified the "${calculatorType}" calculator is present on the home page`)   
    }

    /**This function is to submit/update the pre-retirement calculator */
    async submit_the_form(submit_type: string, fieldType: string, submitType: string){
        // get the json test data and parse
        let testData = fs.readFileSync("data/RequiredData.json", 'utf8')
        let calcData = JSON.parse(testData)
        logger.info(`<< Filling the form with all the required data fields on the calculator >>`) 
        try {
            // fill all the required fields on the calculator
            await this.typeInto(await this.age_text_field, calcData[fieldType].age_text_field)
            await this.typeInto(await this.retirement_age_text_field, calcData[fieldType].retirement_age_text_field)
            await this.typeInto(await this.cur_annaul_income_text_field, calcData[fieldType].cur_annaul_income_text_field)
            await this.typeInto(await this.sp_annaul_income_text_field, calcData[fieldType].sp_annaul_income_text_field)
            await this.typeInto(await this.cur_tot_sav_text_field, calcData[fieldType].cur_tot_sav_text_field)
            await this.typeInto(await this.cur_annual_sav_text_field, calcData[fieldType].cur_annual_sav_text_field)
            await this.typeInto(await this.sav_increase_ratetext_field, calcData[fieldType].sav_increase_ratetext_field)
        } catch (err) {
            err.message = `All Required fields are not filled on the calculator`
            throw err.message
        }
        logger.info(`Successfully filled all the required fields on the calculator`) 
        logger.info(`<< Filling the form with all ssn with required data fields on the calculator >>`)
        // fill ssn fields on the calculator by setting the fieldType to only SSN fields
        if(fieldType == "SSNRequiredData"){
            await this.click(await this.social_benefits_yes)
            await this.click(await this.maritial_status_married)
            await this.typeInto(await this.ssn_override, calcData[fieldType].ssn_override)
            logger.info(`Successfully filled all the SSN required fields filled on the calculator`)
        }
        // update the default calculator fields on the calculator by setting the submit_type to update
        if(submit_type == "update"){
            logger.info(`<< Updating the form with all default ssn data fields on the calculator >>`) 
            try {
                await this.click(await this.adjust_default_btn)
                await this.typeInto(await this.additional_income_text_field, calcData[fieldType].additional_income_text_field)
                await this.typeInto(await this.retirement_duration_text_field, calcData[fieldType].retirement_duration_text_field)
                await this.click(await this.include_inflation_text_field)
                await this.typeInto(await this.retirement_annual_text_field, calcData[fieldType].retirement_annual_text_field)
                await this.typeInto(await this.pre_retirement_roi_text_field, calcData[fieldType].pre_retirement_roi_text_field)
                await this.typeInto(await this.post_retirement_roi_text_field, calcData[fieldType].post_retirement_roi_text_field)
            } catch (err) {
                err.message = `Updating the default calculator values are not set due to the error present while updating`
            logger.error(err.message)
            }
            logger.info(`Successfully updated all the defalt SSN required fields on the calculator`) 
            await this.click(await this.save_changes)
        }
        await this.click(await this.calculate_btn)
        logger.info(`Successfully Click on the calculate button`)
        logger.info(`User is able to "${submit_type}" with "${fieldType}" the calculator and click on calculate button Successfully`) 
    }

    /**This function is to validate the success message displayed on the screen */
    async validate_the_form(){
        try {
            await this.checkElementExists(await this.congrats_text_msg)
            await this.checkElementExists(await this.results_text_msg)
        } catch (err) {
            err.message = `There is some error after updating the fields on the calculator`
            logger.error(err.message)
        }
        logger.info(`User is on the results page successfully`)
    }

    /**This function is to validate the Error messages displayed on the screen */
    async verify_error_msg_form(InvalidDataType: string){
        logger.info(`verifying the error messages displayed on the home page`)
        await this.compareTextElement(await this.error_msg_on_calc, "Please fill out all required fields")
       switch (InvalidDataType) {
        // to check the error message for invalid data for all the fields
        case "InvalidData":
            await this.compareTextElement(await this.annual_savings_error_msg, "Input required")
            await this.compareTextElement(await this.age_error_msg, "Input required")
            await this.compareTextElement(await this.retirement_error_msg, "Input required")
            await this.compareTextElement(await this.current_income_error_msg, "Input required")
            await this.compareTextElement(await this.total_savings_error_msg, "Input required")
            await this.compareTextElement(await this.savings_increase_error_msg, "Input required")   
            break;
        // to check the error message for invalid age fields
        case "InvalidAgeGr100":
            await this.compareTextElement(await this.age_error_msg, "Age cannot be greater than 120")
            await this.compareTextElement(await this.retirement_error_msg, "Age cannot be greater than 120") 
            break;   
        // to check the error message for invalid age fields   
        case "InvalidAge0":
            await this.compareTextElement(await this.age_error_msg, "Age cannot be 0")
            await this.compareTextElement(await this.retirement_error_msg, "Age cannot be 0") 
            break;  
        // to check the error message for invalid retirement fields
        case "InvalidRetireAge":
            await this.compareTextElement(await this.retirement_error_msg, "Planned retirement age must be greater than current age")
            break;  
       }
        logger.info(`User is able see the error message for "${InvalidDataType}" type of data on the screen Successfully`)   
    }

    /**This function is to toggle the ssn benefits fields on the calculator */
    async toggle_ssn(toggle_ssn: string){
        // get all the toggle elements
        let elements = await this.ssn_toggle
        let iselement_present = false
        logger.info(`<< toggle the ssn benefits fields >>`)  
        for(let i=0;i<elements.length;i++){
            // select only the required one passed to the function
            if (await elements[i].getText() === toggle_ssn) {
                await this.click(await elements[i])
                iselement_present = true
                break
            }
        }
        if (iselement_present) {
            logger.info(`User is able to toggle the ssn benefits to "${toggle_ssn}" Successfully`)
        } else {
            throw Error("Element is not toggled due to an error")
        }
    }

    /**This function is to verify the ssn benefits section on the calculator based on toggling */
    async verify_ssn_section(IsPresent: string){
        logger.info(`<< Verifying the ssn section on the calculator >>`)
        if (IsPresent === "present") {
            await this.checkElementExists(await this.maritial_status_single)
            await this.checkElementExists(await this.maritial_status_married)
            await this.checkElementExists(await this.ssn_override)
            logger.info(`I have verified that the SSN benefits section is present`)
        } else {
            if (await this.IsElementPresent(await this.ssn_override)) {
                throw Error("Element should not be present when the user is untoggle it")
            }
            logger.info(`User has verified that the SSN benefits section is not present`)
        }
        logger.info(`User has verified that the SSN benefits "${IsPresent}" based on the calculator`)
    }

}

export default new RetirementHomePage()