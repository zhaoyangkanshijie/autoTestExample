const puppeteer = require('puppeteer');
const environment = {
    development: 'http://localhost:32756',
    uat: 'https://www.baidu.com:9000',
    production: 'https://www.baidu.com'
}
const domain = environment.development;

describe('step1',()=>{
    let browser;
    let page;
    
    beforeAll(async () => {
        jest.setTimeout(100000);//否则会报超时错误
        browser = await puppeteer.launch({
          headless: false
        });
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.setViewport({
            width: 320,
            height: 480
        });
        // await page.evaluate(() => window.localStorage.setItem('antd-pro-authority', 'guest'));
        // await page.waitForSelector('#userName', {
        //     timeout: 5000,
        // });
        // await page.type('#userName', '***');
        // await page.type('#password', '*******');
        // await page.click('button[type="submit"]');
    });
    afterEach(() => page.close());

    test('sendCode', async () => {
        await page.goto(`${domain}/accountoff/process`);
        console.log('url:', await page.url());
        await page.type('.id', 'test', {delay: 100});
		await page.type('.code', '123456', {delay: 100});
		let account = await page.$eval('.id',e=>e.value);
        await page.click('.btn_primary');
        expect(account).toEqual('test');
    });
    afterAll(() => browser.close());
})

