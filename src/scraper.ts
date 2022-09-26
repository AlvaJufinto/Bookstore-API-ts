const puppeter = require("puppeteer");

async function scrapeProduct(url: string): Promise<void> {
    const browser = await puppeter.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const [el] = await page.$x('//*[@id="pdp_comp-product_media"]/div/div[1]/div/div[2]/img');
    // const src = await el.getProperty('style');
    // const srcTxt =  await src.jsonValue();
    console.log(url);
    

    browser.close();
}

module.exports = { scrapeProduct };