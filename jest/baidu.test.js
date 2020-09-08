const puppeteer = require('puppeteer')
let browser;
let page;

beforeAll(async ()=>{
    browser = await puppeteer.launch({
            args: ['--start-maximized'], //浏览器窗口最大化
            headless: false, //开启或关闭无头模式
            ignoreHTTPSErrors:true,
            slowMo:250, //slow down by 250ms, 减慢运行的速度，更好的看清楚操作
            timeout:15000,
            ignoreHTTPSErrors:true,//若访问的是https页面，则忽略https错误
            devtools: false, //打开或关闭浏览器的开发者模式
    });
    page = await browser.newPage();
    page.setViewport({
        width: screen.width,
        height:screen.height //当前屏幕的长和宽
    })
    await page.setJavaScriptEnabled(true)
})

afterAll(async ()=>{
    await browser.close();
})

test("1. Open the baidu; 2. enter a keywords to search", async () => {//声明是异步函数

    await page.goto("https://www.baidu.com", {
        waitUntil: 'networkidle2' //等待网络状态为空闲的时候才继续执行

    });

    //添加assertion，验证百度的标题是否正确
    const pageTitle = await page.title();
    await expect(pageTitle).toMatch('百度一下，你就知道')

    // const inputOfSearch = await page.$('#s_kw_wrap>#kw')

    await page.focus('#kw');
    await page.keyboard.type("Jest");

}, 10000) //设置timeout时间为10000 ms，如果不设置，会报timeout error， 默认是5s