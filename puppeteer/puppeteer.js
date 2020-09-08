const puppeteer = require('puppeteer');
const isDev = true;
const domain = isDev ? 'http://localhost:32756' : 'https://www.baidu.com';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(domain+'/accountoff/process', {
        waitUntil: 'networkidle0'
    });
    await page.type('.id', 'test', {delay: 100});
    await page.type('.code', '123456', {delay: 100});

    await page.click('.btn_primary');

    await page.on('request', request => {
        console.log(request);
    });
    await page.on('response', response => {
        console.log(response,response.status(),response.url(),response.json());
    }); 
    
    //await page.screenshot({ path: 'example.png' });
    await browser.close();
})();