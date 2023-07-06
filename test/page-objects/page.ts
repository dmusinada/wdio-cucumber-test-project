import chai from "chai"
import RequiredData from "../../data/RequiredData.json" assert { type: "json" };
import logger from "../helper/logger.js"
import fs from 'fs'

export default class Page{
    constructor() {
    }


    /** All reusable web functions */

    async navigateTo(path: string) {
        logger.info(`<< Launching the base url >>`)
        await browser.url(path)
        await browser.maximizeWindow()
        logger.info(`I have verified that we are on the landing page`) 
    }

    async click(ele: WebdriverIO.Element){
        await ele.waitForClickable({timeout: 5000})
        if(!ele.elementId) {
            throw Error(ele.error.message)
        }
        await ele.click()
        logger.info(`I have successfully click the button`) 
    }

    async typeInto(ele: WebdriverIO.Element, text: string){
        await ele.waitForDisplayed({timeout: 1000})
        if(!ele.elementId){
            throw Error(ele.error.message)
        }
        await browser.pause(8000)
        await ele.click()
        await ele.addValue(text)
        logger.info(`I have successfully type the ${text} on the text field`) 
    }

    async checkElementExists(ele: WebdriverIO.Element){
        await ele.waitForDisplayed({timeout: 5000})
        if(!ele.elementId){
            throw Error(ele.error.message)
        }
    }

    async getTextElement(ele: WebdriverIO.Element){
        await ele.waitForDisplayed({timeout: 5000})
        if(!ele.elementId){
            throw Error(ele.error.message)
        }
        ele.getText()
    }




}