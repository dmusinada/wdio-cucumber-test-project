import chai from "chai"
import RequiredData from "../../data/RequiredData.json" assert { type: "json" };
import logger from "../helper/logger.js"
import fs from 'fs'

export default class Page{
    constructor() {
    }


    /** All reusable web functions */

    /** This function is to navigate the base url and maximize the window */
    async navigateTo(path: string) {
        logger.info(`<< Launching the base url >>`)
        await browser.url(path)
        await browser.maximizeWindow()
        logger.info(`I have verified that we are on the landing page`) 
    }

    /** This function is to click the webelement */
    async click(ele: WebdriverIO.Element){
        await ele.waitForClickable({timeout: 5000})
        if(!ele.elementId) {
            throw Error(ele.error.message)
        }
        await ele.click()
        logger.info(`I have successfully click the button`) 
    }

      /** This function is to check and type the value into the text fields */
    async typeInto(ele: WebdriverIO.Element, text: string){
        await ele.waitForDisplayed({timeout: 1000})
        if(!ele.elementId){
            throw Error(ele.error.message)
        }
        await browser.pause(2000)
        await ele.click()
        await ele.addValue(text)
        logger.info(`I have successfully type the ${text.length === 0 ? "empty value" : text} on the text field`) 
    }

    /** This function is to only check the element present in the DOM*/
    async checkElementExists(ele: WebdriverIO.Element){
        await ele.waitForDisplayed({timeout: 5000})
        if(!ele.elementId){
            throw Error(ele.error.message)
        }
        logger.info(`I have successfully verified the element with text as ${await ele.getText()} on the page`) 
    }

    /** This function is to get the text from the web element*/
    async getTextElement(ele: WebdriverIO.Element){
        await ele.waitForDisplayed({timeout: 5000})
        if(!ele.elementId){
            throw Error(ele.error.message)
        }
        return ele.getText()
    }

    /** This function is to compare the text from the web element and the text passed to the function*/
    async compareTextElement(ele: WebdriverIO.Element, text: string){
        await this.checkElementExists(ele)
        if(!ele.elementId){
            throw Error(ele.error.message)
        }
        let element_text = this.getTextElement(ele)
        try {
            if (await element_text === text) {
                logger.info(`I have successfully compared the text as "${text}" with the element text as "${element_text}"`) 
            }
            else
            {
                throw Error(ele.error.message)
            }
        } catch (err) {
            logger.error(`Input Text "${text}" is not compared for the element text "${element_text}"`)
        }
    }

    /** This function is to verify the element present on the screen*/
    async IsElementPresent(ele: WebdriverIO.Element){
        return await ele.isDisplayed()
    }

}