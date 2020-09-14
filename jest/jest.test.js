const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
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
        //可设置设备
        //await page.emulate(devices['iPhone X'])

        // 页面登录
        await page.goto('https://demo.youdata.com');
        //输入账号密码
        const uniqueIdElement = await page.$('#uniqueId');
        await uniqueIdElement.type('admin@admin.com', {delay: 20});
        const passwordElement = await page.$('#password', {delay: 20});
        await passwordElement.type('123456');
        //点击确定按钮进行登录
        let okButtonElement = await page.$('#btn-ok');
        //等待页面跳转完成，一般点击某个按钮需要跳转时，都需要等待 page.waitForNavigation() 执行完毕才表示跳转成功
        await Promise.all([
            okButtonElement.click(),
            page.waitForNavigation()  
        ]);
        console.log('admin 登录成功');

        // await page.evaluate(() => window.localStorage.setItem('antd-pro-authority', 'guest'));
        // await page.waitForSelector('#userName', {
        //     timeout: 5000,
        // });
        // await page.type('#userName', '***');
        // await page.type('#password', '*******');
        // await page.click('button[type="submit"]');
    });
    afterEach(() => page.close());

    //测试点击超链接是否跳转正确
    test('index', async () => {
        await page.goto(`${domain}/a/b`);
        console.log('url:', await page.url());
        await page.click('.agree');
        await page.waitFor(5000);
        let url = await page.url();
        expect(url).toEqual(`${domain}/a/c`);
    });

    //测试输入框是否成功去除前后空格
    test('inputTrim', async () => {
        await page.goto(`${domain}/a/c`);
        console.log('url:', await page.url());
        await page.type('.id', ' test ', {delay: 100});
		await page.type('.code', ' 123456 ', {delay: 100});
		let account = await page.$eval('.id',e=>e.value);
        await page.click('.btn_primary');
        expect(account).toEqual('test');
    });

    test('request', async () => {
        await page.setRequestInterception(true); //开启请求拦截
        page.on('request', request => {
            const type = request.resourceType();
            console.log('request',request,type);
            return request.continue();
        });
        page.on('response', response => {
            if(response.request().resourceType() === 'xhr'){ //不是xhr则无法序列化json，会报错
                let text = response.text();
                text.then((result)=>{
                    console.log('text',result);
                })
                let json = response.json();
                json.then((result)=>{
                    console.log('json',result);
                })
            }
        });

        await page.goto(`${domain}/a/c`);
        await page.type('.id', ' test ', {delay: 100});
        await page.click('.btn_primary');
        await page.waitFor(5000);
    });

    afterAll(() => browser.close());
})

