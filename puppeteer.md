# UI自动化测试Puppeteer

* [功能与搭建](#功能与搭建)
* [puppeteer](#puppeteer)
* [browser](#browser)
* [page](#page)
* [Keyboard](#Keyboard)
* [Mouse](#Mouse)
* [Touchscreen](#Touchscreen)
* [请求与响应](#请求与响应)
* [自动输入表单并提交](#自动输入表单并提交)

---

## 功能与搭建

1. 参考链接

    [Puppeteer](https://www.jianshu.com/p/925604f0aac5)

    [Puppeteer官方文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=master)

    [puppeteer初使用](https://www.jianshu.com/p/a8d2de475913)

2. 详解

    * 使用原因
    
        对某些业务逻辑或者功能进行添加或者修改的时候，会牵扯到一些其他地方的问题
        
        同时，由于环境及数据的区别，代码会在某些特殊数据的解析和和展示上出现问题，页面上很难去发现。

    * 解决什么问题

        1. 在进行代码和功能改动后，能够自动访问各个功能的页面，检测问题
        2. 针对大量的数据内容，进行批量访问，检测对于不同数据的展示是否存在问题
        3. 测试与代码功能尽量不耦合，避免每次上新功能都需要对测试用例进行修改，维护成本太大
        4. 定期的测试任务，及时发现数据平台针对新数据的展示完备性

    * 有什么功能

        1. 访问页面，进行截图
        2. 自动进行键盘输入，提交表单
        3. 模拟点击等用户操作
        4. 等等

    * 安装

        npm i puppeteer:如node版本较低，则需要降低puppeteer版本，可自己设置，如npm i puppeteer@2.0.0 -g

        当你安装 Puppeteer 时，它会下载最新版本的Chromium（~170MB Mac，~282MB Linux，~280MB Win），以保证可以使用 API。 如果想要跳过下载，可先安装内核:npm i puppeteer-core，再自行百度“.local-chromium”，进行下载

        完成后，新建app.js，写入样例代码
        ```js
        const puppeteer = require('puppeteer');
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://example.com');
            await page.screenshot({ path: 'example.png' });
            await browser.close();
        })();
        ```
        node app.js即可看到效果

## puppeteer

```js
const puppeteer = require('puppeteer');
puppeteer.connect(options)
options <Object>
    browserWSEndpoint <string> 一个 浏览器 websocket 端点链接。
    ignoreHTTPSErrors <boolean> 是否在导航期间忽略 HTTPS 错误. 默认是 false。
    defaultViewport <?Object> 为每个页面设置一个默认视口大小。默认是 800x600。如果为 null 的话就禁用视图口。
        width <number> 页面宽度像素。
        height <number> 页面高度像素。
        deviceScaleFactor <number> 设置设备的缩放（可以认为是 dpr）。默认是 1。
        isMobile <boolean> 是否在页面中设置了 meta viewport 标签。默认是 false。
        hasTouch<boolean> 指定viewport是否支持触摸事件。默认是 false。
        isLandscape <boolean> 指定视口是否处于横向模式。默认是 false。
    slowMo <number> 将 Puppeteer 操作减少指定的毫秒数。这样你就可以看清发生了什么，这很有用。
returns: <Promise<Browser>>

puppeteer.launch([options])
options <Object> 在浏览器上设置的一组可配置选项。 有以下字段：
    ignoreHTTPSErrors <boolean> 是否在导航期间忽略 HTTPS 错误. 默认是 false。
    headless <boolean> 是否以 无头模式 运行浏览器。默认是 true，除非 devtools 选项是 true。
    executablePath <string> 可运行 Chromium 或 Chrome 可执行文件的路径，而不是绑定的 Chromium。如果 executablePath 是一个相对路径，那么他相对于 当前工作路径 解析。
    slowMo <number> 将 Puppeteer 操作减少指定的毫秒数。这样你就可以看清发生了什么，这很有用。
    defaultViewport <?Object> 为每个页面设置一个默认视口大小。默认是 800x600。如果为 null 的话就禁用视图口。
        width <number> 页面宽度像素。
        height <number> 页面高度像素。
        deviceScaleFactor <number> 设置设备的缩放（可以认为是 dpr）。默认是 1。
        isMobile <boolean> 是否在页面中设置了 meta viewport 标签。默认是 false。
        hasTouch<boolean> 指定viewport是否支持触摸事件。默认是 false。
        isLandscape <boolean> 指定视口是否处于横向模式。默认是 false。
    args <Array<string>> 传递给浏览器实例的其他参数。 这些参数可以参考 这里。
    ignoreDefaultArgs <(boolean|<Array<string>>)> 如果是 true，那就不要使用 puppeteer.defaultArgs()。 如果给出了数组，则过滤掉给定的默认参数。这个选项请谨慎使用。默认为 false。
    handleSIGINT <boolean> Ctrl-C 关闭浏览器进程。默认是 true。
    handleSIGTERM <boolean> 关闭 SIGTERM 上的浏览器进程。默认是 true。
    handleSIGHUP <boolean> 关闭 SIGHUP 上的浏览器进程。默认是 true.
    timeout <number> 等待浏览器实例启动的最长时间（以毫秒为单位）。默认是 30000 (30 秒). 通过 0 来禁用超时。
    dumpio <boolean> 是否将浏览器进程标准输出和标准错误输入到 process.stdout 和 process.stderr 中。默认是 false。
    userDataDir <string> 用户数据目录 路径。
    env <Object> 指定浏览器可见的环境变量。默认是 process.env。
    devtools <boolean> 是否为每个选项卡自动打开DevTools面板。如果这个选项是 true，headless 选项将会设置成 false。
    pipe <boolean> 通过管道而不是WebSocket连接到浏览器。默认是 false。
returns: <Promise<Browser>> 浏览器实例支持 Promise。
```

打开浏览器
```js
const browser = await puppeteer.launch();
```

## browser

```js
Events
browser.on('disconnected')//从 Chromium 实例断开连接时被触发,原因为浏览器关闭、崩溃、手动关闭
browser.on('targetchanged')
browser.on('targetcreated')//页面创建触发,原因为通过 window.open 或 browser.newPage 打开一个新的页面
browser.on('targetdestroyed')//页面关闭触发
Methods
browser.browserContexts()//返回一个包含所有打开的浏览器上下文的数组
browser.close()//关闭 Chromium 及其所有页面
browser.createIncognitoBrowserContext()//创建一个匿名的浏览器上下文。这将不会与其他浏览器上下文分享 cookies/cache。
    const browser = await puppeteer.launch();
    // 创建一个匿名的浏览器上下文
    const context = await browser.createIncognitoBrowserContext();
    // 在一个原生的上下文中创建一个新页面
    const page = await context.newPage();
    // 做一些事情
    await page.goto('https://example.com');

browser.defaultBrowserContext()//返回一个默认的浏览器上下文。这个上下文不能被关闭。
browser.disconnect()//断开 Puppeteer 和浏览器的连接，但 Chromium 进程仍然在运行。
browser.newPage()//返回一个新的 Page 对象
browser.pages()//返回一个浏览器中所有页面的数组。
browser.process()//产生浏览器的进程
browser.target()//返回浏览器相关的目标对象
browser.targets()//浏览器内所有活动目标组成的数组
browser.userAgent()
browser.version()
browser.wsEndpoint()//返回浏览器 websocket 的地址
```

打开页面
```js
const page = await browser.newPage();
```

## page

frame同理

```js
Events
page.on('close')
page.on('console')//页面调用console触发
page.on('dialog')//页面调用alert, prompt, confirm 或者 beforeunload触发
page.on('domcontentloaded')
page.on('error')
page.on('frameattached')//当 iframe 加载的时候触发
page.on('framedetached')//当 iframe 从页面移除的时候触发
page.on('framenavigated')//当 iframe 导航到新的 url 时触发
page.on('load')
page.on('metrics')//当页面js代码调用了 console.timeStamp 方法时触发
page.on('pageerror')
page.on('request')
page.on('requestfailed')
page.on('requestfinished')
page.on('response')
page.on('workercreated')//当页面生成相应的 WebWorker 时触发
page.on('workerdestroyed')//当页面终止相应的 WebWorker 时触发
Namespaces
page.accessibility
page.coverage
page.keyboard
page.mouse
page.touchscreen
page.tracing
Methods
page.$(selector)//在页面内执行 document.querySelector
page.$$(selector)//在页面内执行 document.querySelectorAll
page.$$eval(selector, pageFunction[, ...args])//在页面内执行 Array.from(document.querySelectorAll(selector))，然后把匹配到的元素数组作为第一个参数传给 pageFunction
    const divsCounts = await page.$$eval('div', divs => divs.length);
page.$eval(selector, pageFunction[, ...args])//在页面内执行 document.querySelector，然后把匹配到的元素作为第一个参数传给 pageFunction
    const searchValue = await page.$eval('#search', el => el.value);
    const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
    const html = await page.$eval('.main-container', e => e.outerHTML);
page.$x(expression)
page.addScriptTag(options)//注入一个指定src(url)或者代码(content)的 script 标签到当前页面
page.addStyleTag(options)//添加一个指定link(url)的标签
page.authenticate(credentials)//为HTTP authentication 提供认证凭据
    credentials:
    {
        username: ...
        password: ...
    }
page.bringToFront()//多个tab时，切换到某个tab
page.browser()//得到当前 page 实例所属的 browser 实例
page.click(selector[, options])
    options:
        button <string> left, right, 或者 middle, 默认是 left。
        clickCount <number> 默认是 1.。
        delay <number> mousedown 和 mouseup 之间停留的时间，单位是毫秒。默认是0
        
    const [response] = await Promise.all([
        page.waitForNavigation(waitOptions),
        page.click(selector, clickOptions),
    ]);
page.close([options])
page.content()//返回页面的完整 html 代码
page.cookies([...urls])//返回指定的 url 下的 cookie
page.deleteCookie(...cookies)
page.emulate(options)//根据指定的参数和 user agent 生成模拟器
    options <Object>
        viewport <Object>
            width <number> 页面的宽度，单位像素.
            height <number> 页面的高度，单位像素.
            deviceScaleFactor <number> 定义设备缩放， (类似于 dpr). 默认 1。
            isMobile <boolean> 要不要包含meta viewport 标签. 默认 false。
            hasTouch<boolean> 指定终端是否支持触摸。默认 false
            isLandscape <boolean> 指定终端是不是 landscape 模式. 默认 false。
        userAgent <string>
    const puppeteer = require('puppeteer');
    const devices = require('puppeteer/DeviceDescriptors');
    const iPhone = devices['iPhone 6'];

    puppeteer.launch().then(async browser => {
        const page = await browser.newPage();
        await page.emulate(iPhone);
        await page.goto('https://www.google.com');
        // 其他操作...
        await browser.close();
    });
page.emulateMedia(mediaType)//改变页面的css媒体类型。支持的值仅包括 'screen', 'print' 和 null。
page.evaluate(pageFunction[, ...args])//在页面实例上下文中执行的方法
    const result = await page.evaluate(x => {
    return Promise.resolve(8 * x);
    }, 7); // （译者注： 7 可以是你自己代码里任意方式得到的值）
    console.log(result); // 输出 "56"

    console.log(await page.evaluate('1 + 2')); // 输出 "3"
    const x = 10;
    console.log(await page.evaluate(`1 + ${x}`)); // 输出 "11"

    const bodyHandle = await page.$('body');
    const html = await page.evaluate(body => body.innerHTML, bodyHandle);
    await bodyHandle.dispose();
page.evaluateHandle(pageFunction[, ...args])
page.evaluateOnNewDocument(pageFunction[, ...args])
page.exposeFunction(name, puppeteerFunction)//方法挂载到window对象
    puppeteer.launch().then(async browser => {
    //...
    await page.exposeFunction('md5', text =>
        crypto.createHash('md5').update(text).digest('hex')
    );
    await page.evaluate(async () => {
        // 使用 window.md5 计算哈希
        const myString = 'PUPPETEER';
        const myHash = await window.md5(myString);
        console.log(`md5 of ${myString} is ${myHash}`);
    });
    await browser.close();
    });
page.focus(selector)
page.frames()//返回: <Array<Frame>> 加载到页面中的所有iframe标签
page.goBack([options])
    options <Object> 导航配置，可选值：
        timeout <number> 跳转等待时间，单位是毫秒, 默认是30秒, 传 0 表示无限等待。可以通过page.setDefaultNavigationTimeout(timeout)方法修改默认值
        waitUntil <string|Array<string>> 满足什么条件认为页面跳转完成，默认是load事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
            load - 页面的load事件触发时
            domcontentloaded - 页面的DOMContentLoaded事件触发时
            networkidle0 - 不再有网络连接时触发（至少500毫秒后）
            networkidle2 - 只有2个网络连接时触发（至少500毫秒后）
page.goForward([options])
    参数同上
page.goto(url[, options])
    参数同上
    额外增加referer
page.hover(selector)
page.isClosed()
page.mainFrame()
page.metrics()//返回: <Promise<Object>> 包含指标数据的键值对
page.pdf([options])
page.queryObjects(prototypeHandle)
page.reload([options])
page.screenshot([options])
page.select(selector, ...values)
page.setBypassCSP(enabled)
page.setCacheEnabled([enabled])
page.setContent(html[, options])//分派给页面的HTML
page.setCookie(...cookies)
    name <string> required
    value <string> required
    url <string>
    domain <string>
    path <string>
    expires <number> Unix time in seconds.
    httpOnly <boolean>
    secure <boolean>
    sameSite <"Strict"|"Lax">
page.setDefaultNavigationTimeout(timeout)
page.setExtraHTTPHeaders(headers)
page.setGeolocation(options)
page.setJavaScriptEnabled(enabled)
page.setOfflineMode(enabled)//启用离线模式
page.setRequestInterception(value)//是否启用请求拦截器
page.setUserAgent(userAgent)
page.setViewport(viewport)
page.tap(selector)
page.target()
page.title()
page.type(selector, text[, options])//向选中元素输入内容
page.url()
page.viewport()
page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
page.waitForFunction(pageFunction[, options[, ...args]])
page.waitForNavigation([options])
page.waitForRequest(urlOrPredicate[, options])
page.waitForResponse(urlOrPredicate[, options])
page.waitForSelector(selector[, options])
page.waitForXPath(xpath[, options])
page.workers()
```

## Keyboard

持续按下 Shift 来选择一些字符串并且删除的例子
```js
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
```

按下 A 的例子
```js
await page.keyboard.down('Shift');
await page.keyboard.press('KeyA');
await page.keyboard.up('Shift');
```

```js
Methods
keyboard.down(key[, options])
keyboard.press(key[, options])
keyboard.sendCharacter(char)//发送到页面的字符
keyboard.type(text, options)//要输入到焦点元素中的文本
    page.keyboard.type('World', {delay: 100}); // 更缓慢的输入, 像一个用户
keyboard.up(key)
```

## Mouse

```js
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

```js
Methods
mouse.click(x, y, [options])
    options <Object>
        button <string> left ，right 或 middle，默认是 left。
        clickCount <number> 默认是 1。
        delay <number> 在毫秒内且在 mousedown 和 mouseup 之间等待的时间。 默认为0。
mouse.down([options])
    options <Object>
        button <string> left，right 或 middle，默认是 left。
        clickCount <number> 默认是 1。
mouse.move(x, y, [options])
    options <Object>
        steps <number> 默认是 1。中间触发 mousemove 事件。
mouse.up([options])
    options <Object>
        button <string> left，right，或 middle，默认是 left。
        clickCount <number> 默认是 1。
```

## Touchscreen

```js
touchscreen.tap(x, y)触发 touchstart 和 touchend 事件
```

## 请求与响应

每当页面发送一个请求，以下事件会被 puppeteer 页面触发：

1. 'request' 当请求发起后页面会触发这个事件。
2. 'response' 请求收到响应的时候触发。
3. 'requestfinished' 请求完成并且响应体下载完成时触发。

```js
Methods
request.abort([errorCode])
    aborted - 操作被取消 (因为用户的行为)
    accessdenied - 访问资源权限不足(非网络原因)
    addressunreachable - 找不到IP地址 这通常意味着没有路由通向指定主机或者网络
    blockedbyclient - 客户端选择阻止请求
    blockedbyresponse - 请求失败，因为响应是与未满足的要求一起传递出去的（例如，'X-Frame-Options' 和'Content-Security-Policy' 祖先检查）
    connectionaborted - 未收到数据发送的ACK信号导致的连接超时
    connectionclosed - 连接关闭(对应 TCP FIN 包)
    connectionfailed - 尝试连接失败。
    connectionrefused - 尝试连接拒绝。
    connectionreset - 连接被重置 (对应 TCP RST 包)。
    internetdisconnected - 网络连接丢失。
    namenotresolved - 主机名字无法被解析。
    timedout - 操作超时。
    failed - 发生通用错误。
request.continue([overrides])
    url <string> 如果设置的话，请求 url 将会改变
    method <string> 如果设置的话，会改变请求方法 (例如，GET 或者 POST)
    postData <string> 如果设置的话，会改变请求要提交的数据
    headers <Object> 如果设置的话，改变 http 请求头
request.failure()
request.frame()
request.headers()
request.isNavigationRequest()
request.method()
request.postData()
request.redirectChain()
request.resourceType()
request.respond(response)
request.response()
request.url()
Methods
response.buffer()
response.frame()
response.fromCache()
response.fromServiceWorker()
response.headers()
response.json()
response.ok()
response.remoteAddress()
response.request()
response.securityDetails()
response.status()
response.statusText()
response.text()
response.url()
```

## 自动输入表单并提交

1. 参考链接

    [puppeteer 实例：自动输入表单并提交搜索显示新的页面](https://blog.csdn.net/wbj16116/article/details/79614961?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~first_rank_v2~rank_v25-1-79614961.nonecase&utm_term=puppeteer%E8%BE%93%E5%85%A5)

2. 详解

    ```js
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://baidu.com');
        await page.type('#kw', 'puppeteer', {delay: 100}); //打开百度后，自动在搜索框里慢慢输入puppeteer ,
        page.click('#su') //然后点击搜索
        await page.waitFor(1000);
        const targetLink = await page.evaluate(() => {
            let url =  document.querySelector('.result a').href
            return url
        });
        console.log(targetLink);
        await page.goto(targetLink);
        // await page.waitFor(1000);
        browser.close();
    })()
    ```