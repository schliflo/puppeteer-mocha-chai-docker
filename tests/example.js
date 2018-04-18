const {expect} = require('chai');
const puppeteer = require('puppeteer');
const URLS = process.env.URLS;
const urlsToTest = URLS.split(',');

const throwError = (error, element, page) => {
    error.message += '\n     Tag:   ' + element.outerHTML;
    error.message += '\n     Page:  ' + page;
    throw new Error(error);
};

// expect value to be not empty and not undefined
const expectRationalValue = (value, element, page) => {
    try {
        expect(value).to.not.be.oneOf([
            undefined,
            null,
            '',
            ' ',
            '  ',
            '#'
        ]);
    } catch (e) {
        throwError(e, element, page);
    }
};

urlsToTest.forEach((testUrl) => {

    // make sure all img tags have a src attribute with a value
    describe('Images: ' + testUrl, function () {
        // Define global variables
        let browser;
        let page;
        let elements = [];
        let currentPage = '';

        before(async () => {
            browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-dev-shm-usage']});
            page = await browser.newPage();
            await page.goto(testUrl, {'waitUntil': 'networkidle0'});
            currentPage = await page.url();
            elements = await page.evaluate(
                () => [...document.querySelectorAll('img')]
                    .map(element => {
                        let e = {};
                        e.attributes = {};
                        e.tagName = element.tagName;
                        e.outerHTML = element.outerHTML;

                        for (let i = 0, atts = element.attributes, n = atts.length; i < n; i++) {
                            e.attributes[atts[i].nodeName] = atts[i].nodeValue;
                        }

                        return e;
                    })
            );
        });

        beforeEach(async () => {
        });

        afterEach(async () => {
        });

        after(async () => {
            await browser.close();
        });

        it('has no missing or empty src attributes', async function () {
            for (let i = 0; i < elements.length; i++) {
                expectRationalValue(elements[i].attributes.src, elements[i], currentPage);
            }
        });
    });
});
