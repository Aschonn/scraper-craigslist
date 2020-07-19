//our headless browser 
const puppeteer = require("puppeteer-extra");
//creates json files
const fs = require("fs");


//Enter In A State:
const city = "fargo"; //ENTER CITY

//our custom url
const url = `https://${city}.craigslist.org`;

//if there is an error send message
main().then(() => console.log('Done')).catch(error => console.log("there was an error in your inputs please reload and enter valid inputs", error));

async function main() {
    const query = 'motorcycle';

    //launches puppeteer
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    
    //gets a page
    const page = await browser.newPage();
    
    //goes to specified url
    await page.goto(url);

    //give webpage time to load
    await page.waitFor("input[name='query']");
    
    // click on search 
    await page.click("input[name='query']");


    
    //enter term we want to search
    await page.evaluate(() => {
        document.querySelector('input[name="query"]').value = 'Motorcycle'; //ENTER VALUE
    });

    
    
    
    //press enter after inputing search term
    await page.keyboard.press('Enter');

    //waits for specific item to load
    await page.waitFor(".result-row");

    //gather data
    const data = await page.$$eval(".result-row", rows => {
        return rows.map(row => {
            
            //creates dict so we can manipulate data easier
            const properties = {};
            
            //gather post title and url
            const titleElement = row.querySelector(".result-title");
            //title
            properties.title = titleElement ? titleElement.innerText : "";
            //url
            properties.url = titleElement ? titleElement.getAttribute("href") : "";
            //gather price 
            const priceElement = row.querySelector('.result-price');
            properties.price = priceElement ? priceElement.innerText : ""

            return properties
        });


    });

    //consoles data 
    console.log(data);

    //writes json file for later use if needed
    fs.writeFile('myjsonfile.json', JSON.stringify(data), function (err, result) {
        if (err) console.log('error', err);
    });
}


