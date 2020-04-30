//our headless browser 
const puppeteer = require("puppeteer-extra");
//creates json files
const fs = require("fs");


//Enter In A State:
const state = "fargo"; //enter a value here

const url = `https://${state}.craigslist.org`;


main().then(() => console.log('Done')).catch(error => console.log("there was an error in your inputs please reload and enter valid inputs", error));

async function main() {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitFor("input[name='query']");


    await page.click("input[name='query']");
    await page.evaluate(() => {
        document.querySelector('input[name="query"]').value = "motorcycle"; //enter a value here
    });

    await page.keyboard.press('Enter');

    await page.waitFor(".result-row");

    const data = await page.$$eval(".result-row", rows => {
        return rows.map(row => {
            const properties = {};
            const titleElement = row.querySelector(".result-title");
            properties.title = titleElement ? titleElement.innerText : "";
            properties.url = titleElement ? titleElement.getAttribute("href") : "";
            const priceElement = row.querySelector('.result-price');
            properties.price = priceElement ? priceElement.innerText : "";
            const imageElement = row.querySelector(".swipe [data-index='0'] img");
            properties.imageUrl = imageElement ? imageElement.getAttribute("src") : "";

            return properties
        });


    });
    console.log(data);
    fs.writeFile('myjsonfile.json', JSON.stringify(data), function (err, result) {
        if (err) console.log('error', err);
    });
}


