const puppeteer = require('puppeteer');
const urls = process.env.URLS.split(',');

urls.forEach(async (url) => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-dev-shm-usage']});
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 720});

    await page.goto(url, {'waitUntil': 'networkidle0'});
    await page.screenshot({
        fullPage: true,
        path: '/validator/screenshots/' + url.replace(/^.*\/\/[^\/]+/, '').replace(/(\.html)|(\.htm)|(\.php)/, '') + '.png'
    });

    await browser.close();
});
