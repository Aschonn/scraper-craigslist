# scraper-craigslist

A craigslist scraper that creates a json file with postes from 

## Getting Started

### `npm install puppeteer fs puppeteer-extra`
This install all the needed dependencies.

### Enter in custom search term and location

### `node scraper.js`

This starts the scraper


## Mock Data Example
### City = Fargo
### Search = Motorcycle

```
{
    title: 'Full Face Fulmer Helmet',
    url: 'https://fargo.craigslist.org/mpo/d/vergas-full-face-fulmer-helmet/7160600625.html',
    price: '$30'
  },
  {
    title: 'hjc helmets',
    url: 'https://fargo.craigslist.org/mpo/d/fargo-hjc-helmets/7160571651.html',
    price: '$150'
  },
  {
    title: 'Dunlop lite Tires',
    url: 'https://fargo.craigslist.org/mpo/d/fargo-dunlop-lite-tires/7160571894.html',
    price: '$300'
  },
  {
    title: 'victory saddlebag liners',
    url: 'https://fargo.craigslist.org/mpo/d/fargo-victory-saddlebag-liners/7160571375.html',
    price: '$50'
}
  ```

## Optional/More Information

### Dont want webpage opening?
turn `headless: false` to `headless : true`

### Want JSON file to be a different name? 
Go to `fs.writeFile` and change `'myjsonfile.json'` to `'AnythingYouLike.json'`



