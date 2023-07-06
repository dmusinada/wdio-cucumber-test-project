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

    get age_text_field() { return $(`#current-age`)}
    get retirement_age_text_field() { return $(`#retirement-age`)}
    get cur_annaul_income_text_field() { return $(`#current-income`)}
    get sp_annaul_income_text_field() { return $(`#spouse-income`)}
    get cur_tot_sav_text_field() { return $(`#current-total-savings`)}
    get cur_annual_sav_text_field() { return $(`#current-annual-savings`)}
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




    /**Page Actions */



    async verify_the_form(calculatorType: string){
        logger.info(`verifying the calculator present on the home page`)  
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
            err.message = `Pre-retirement calculator is not present on the page`
            logger.error(err.message)
        }
        logger.info(`I have verified the calculator ${calculatorType} is present on the page`)   
    }

    async submit_the_form(submit_type: string, fieldType: string, submitType: string){
        let testData = fs.readFileSync("data/RequiredData.json", 'utf8')
        let calcData = JSON.parse(testData)
        logger.info(`I have verified the test data retrieved from the test source`) 
        logger.info(`<< Filling the form with all the required data fields on the calculator >>`) 
        try {
            await this.typeInto(await this.age_text_field, calcData[fieldType].age_text_field)
            await this.typeInto(await this.retirement_age_text_field, calcData[fieldType].retirement_age_text_field)
            await this.typeInto(await this.cur_annaul_income_text_field, calcData[fieldType].cur_annaul_income_text_field)
            await this.typeInto(await this.sp_annaul_income_text_field, calcData[fieldType].sp_annaul_income_text_field)
            await this.typeInto(await this.cur_tot_sav_text_field, calcData[fieldType].cur_tot_sav_text_field)
            await this.typeInto(await this.cur_annual_sav_text_field, calcData[fieldType].cur_annual_sav_text_field)
            await this.typeInto(await this.sav_increase_ratetext_field, calcData[fieldType].sav_increase_ratetext_field)
        } catch (err) {
            err.message = `All Required fields are not filled on the calculator`
            logger.error(err.message)
        }
        logger.info(`Successfully filled all the required feilds filled on the calculator`) 
        logger.info(`<< Filling the form with all ssn with required data fields on the calculator >>`) 
        if(fieldType == "SSNRequiredData"){
            await this.click(await this.social_benefits_yes)
            await this.click(await this.maritial_status_married)
            await this.typeInto(await this.ssn_override, calcData[fieldType].ssn_override)
            logger.info(`Successfully filled all the SSN required fields filled on the calculator`)
        }

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
        logger.info(`Clicked on the calculate button on the calculator`)
    }

    async validate_the_form(){
        try {
            await this.checkElementExists(await this.congrats_text_msg)
            await this.checkElementExists(await this.results_text_msg)
        } catch (err) {
            err.message = `There is some error after updating the fields on the calculator`
            logger.error(err.message)
            
        }
        logger.info(`I have verified that we are on the success page`)
    }

}

export default new RetirementHomePage()