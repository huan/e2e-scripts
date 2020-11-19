/**
 * Huan(202011)
 *  https://chatie.checklyhq.com/
 */

// this script emulates a user filling out a form on an iPad
// import puppeteer from 'puppeteer'
import playwright from 'playwright'

require('dotenv').config()

async function main () {
    const PHONE = process.env.JUZI_CRM_LOGIN_PHONE
    const PASSWD = process.env.JUZI_CRM_LOGIN_PASSWD

    if (!PHONE || !PASSWD) {
        throw new Error('need PHONE & PASSWD for login to juzi crm')
    }

    // const devices = require('puppeteer/DeviceDescriptors');

    const browser = await playwright.chromium.launch({
        headless: false,
    })
    const page = await browser.newPage()
    // await page.emulate(devices['iPad Pro'])
    
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('https://crm.botorange.com/login/phone')
    
    // Click the not-chrome-warning
    // await page.waitForSelector('div.ant-modal-confirm-btns button')
    // await page.click('div.ant-modal-confirm-btns button')
    
    // await page.waitForSelector('#phoneNumber')
    // Fill out the form
    await page.type('[placeholder="请输入手机号"]', PHONE)
    await page.type('[placeholder="请输入密码"]', PASSWD)
    await page.click('div button.ant-btn-primary')
    await page.waitForNavigation()
    
    // Click the non-chrome-warning
    // await page.waitForSelector('div button.ant-btn-primary')
    // await page.click('div button.ant-btn-primary')
    
    // const linkHandlers = 
    await page.click('//li/div/span/span[text()="售前组袋袋"]')

    // if (linkHandlers.length > 0) {
    //     console.log('linkHandlers.length=', linkHandlers.length)
    //     await linkHandlers[0].click();
    // } else {
    //     throw new Error("Link not found");
    // }

    await page.waitForSelector('#all-chat')
    await new Promise(resolve => setTimeout(resolve, 500))
    await page.click('#all-chat')

    console.log('waitForSelector span.ant-badge...')
    await page.waitForSelector('span.ant-badge')
    console.log('waitForSelector span.ant-badge... done.')

    // await new Promise(resolve => setTimeout(resolve, 40000))
    // await page.click('#all-chat')
    
    // const confirmationText = await page.$eval('#submit-form-button', el => el.value)
    // console.log(confirmationText)
    // assert.equal(confirmationText, 'Thanks for registering')
    
    // take a screenshot an close
    await page.screenshot({ path: 'screenshot.mock-site.jpg' })
    await browser.close()
}

main().catch(console.error)