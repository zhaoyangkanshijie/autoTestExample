# 单元测试Jest

* [安装与基础使用](#安装与基础使用)
* [jest基础使用样例](#jest基础使用样例)
* [vue2单元测试](#vue2单元测试)
* [vue2单元测试添加到现有项目](#vue2单元测试添加到现有项目)

---

## 安装与基础使用

1. 参考链接

    [Jest测试框架入门](https://www.bbsmax.com/A/ZOJPepll5v/)

    [使用Jest测试JavaScript (入门篇)](https://www.jianshu.com/p/70a4f026a0f1)

    [Jest + Puppeteer 界面自动化测试](https://blog.csdn.net/qq_33303090/article/details/95041159)

    [webpack打包踩坑之TypeError: Cannot read property 'bindings' of null](https://www.cnblogs.com/Joe-and-Joan/p/10335881.html)

    [结合项目来谈谈 Puppeteer](https://zhuanlan.zhihu.com/p/76237595)

2. 详解

    npm init

    package.json运行test命令改为
    ```js
    "scripts": {
        "test": "jest"
    }
    ```

    全部执行命令：jest

    单个执行命令：jest XXXX.test.js

    如果报错，删除.babelrc文件

    基础使用
    ```js
    //describe 描述, decribe会形成一个作用域
    //it 断言
    //expect 期望
    //test 测试，类似it
    describe('test testObject', () => {
        beforeAll(() => {
            // 预处理操作
        })
        test('is foo', () => {
        expect(testObject.foo).toBeTruthy()
        })
        test('is not bar', () => {
            expect(testObject.bar).toBeFalsy()
        })
        afterAll(() => {
            // 后处理操作
        })
    })
    ```

    架构
    ```txt
    Browser： 对应一个浏览器实例，一个 Browser 可以包含多个 BrowserContext
    BrowserContext： 对应浏览器一个上下文会话，就像我们打开一个普通的 Chrome 之后又打开一个隐身模式的浏览器一样，BrowserContext 具有独立的 Session(cookie 和 cache 独立不共享)，一个 BrowserContext 可以包含多个 Page
    Page：表示一个 Tab 页面，通过 browserContext.newPage()/browser.newPage() 创建，browser.newPage() 创建页面时会使用默认的 BrowserContext，一个 Page 可以包含多个 Frame
    Frame: 一个框架，每个页面有一个主框架（page.MainFrame()）,也可以多个子框架，主要由 iframe 标签创建产生的
    ExecutionContext： 是 javascript 的执行环境，每一个 Frame 都一个默认的 javascript 执行环境
    ElementHandle: 对应 DOM 的一个元素节点，通过该该实例可以实现对元素的点击，填写表单等行为，我们可以通过选择器，xPath 等来获取对应的元素
    JsHandle：对应 DOM 中的 javascript 对象，ElementHandle 继承于 JsHandle，由于我们无法直接操作 DOM 中对象，所以封装成 JsHandle 来实现相关功能
    CDPSession：可以直接与原生的 CDP 进行通信，通过 session.send 函数直接发消息，通过 session.on 接收消息，可以实现 Puppeteer API 中没有涉及的功能
    Coverage：获取 JavaScript 和 CSS 代码覆盖率
    Tracing：抓取性能数据进行分析
    Response： 页面收到的响应
    Request： 页面发出的请求
    ```

## jest基础使用样例

1. 参考链接

    [不想痛失薪资普调和年终奖？试试自动化测试！（基础篇）](https://juejin.im/post/5eeae4f7e51d4574195ed982)

    [Jest](https://www.jianshu.com/p/c2fef6b2820f)

    [Jest Docs](https://jestjs.io/docs/en/getting-started)

2. 详解

    * 大小相等关系判断，真假非判断，匹配，包含
    ```js
    // sum.ts
    const sum = (a: number, b: number): number => { 
      return a + b;
    };
    // sum.test.ts
    describe('Should sum function run correctly', () => { 
      test('input: 1, 2 expect: 3', () => {
      // toBe:判断是否严格相等（使用Object .is) 
      expect(sum(1, 2)).toBe(3); // toXXX:匹配器 
      // toEqual:判断值是否相等 
      expect(sum(1, 2)).toEqual(3);
      // toBeDefined:判断是否被定义 
      expect(sum(1, 2)).toBeDefined();
      // toBeUndefined:判断是否未被定义
      expect(sum(1, 2)).not.toBeUndefined(); // not.toXXX:取反
      // toBeTruthy:判断是否为真值（true、非零数字、非空字符串、对象/数组等) 
      expect(sum(1, 2)).toBeTruthy();
      // toBeFalsy:判断是否为假值（false、0、空字符串、undefined/null 等) 
      expect(sum(1, 2)).not.toBeFalsy();
      // toBeG reate「Than:判断数值是否大于期望值 
      expect(sum(1, 2)).toBeGreaterThan(2);
      // toBeLessThan:判断数值是否小于期望值 
      expect(sum(1, 2)).toBeLessThan(4);
      // toBeGreaterThanO「Equal:判断数值是否大于等于期望值 
      expect(sum(1, 2)).toBeGreaterThan0rEqual(3);
      // toBeLessThanOrEqual:判断数值是否小于等于期望值 
      expect(sum(1, 2)).toBeLessThanOrEqual(3);
      expect(n).toBeNull(); //判断是否为null
      expect(value).toBeCloseTo(0.3); // 浮点数判断相等
      expect('Christoph').toMatch(/stop/); //正则表达式判断
      expect(['one','two']).toContain('one'); //包含判断ss
      });
    });
    ```

    * 匹配
    ```js
    // showHello.ts
    const showHello: string = 'Hello,aaa';
    // showHello.test.ts
    describe('Should showHello defined correctly', () => { 
      it('expect to match "Hello"', () => { 
        expect(showHello).toMatch(/hello/i);
      });
      it('expect to match "aaa"', () => { 
        expect(showHello).toMatch('aaa');
      });
    });
    ```

    * 包含
    ```js
    // array.ts
    const array: [number] = [1, 2, 3, 4];
    // array.test.ts
    describe('Should array defined correctly',  () => {
      it('expect to contain 1', () => { 
        expect(array).toContain(l);
      });
      it('expect to contain 1', () => { 
        expect(new Set(array)).toContain(l); 
      });
    });
    ```

    * 抛出异常
    ```js
    // compileAndroidCode.ts 
    const compileAndroidCode = Error => { 
      throw new Error('you are using the wrong JDK');
    };
    // compileAndroidCode.test.ts
    test('compiling android goes as expected', () => { 
      expect(compileAndroidCode).toThrow(); 
      expect(compileAndroidCode).toThrow(Error);
      expect(compileAndroidCode).toThrow('you are using the wrong JDK'); 
      expect(compileAndroidCode).toThrow(/JDK/);
    });
    ```

    * 测试请求回调
    ```js
    // 回调
    it('done', (done) => { 
      fetch('/example')
      .then((res) => {
        expect(res).toEqual({ code: '200', data: {}, msg: 'success' }); 
        done();
      })
      .catch((err) => { 
        done(err);
      });
    });
    ```

    * 函数调用、调用次数、传参、返回值
    ```js
    function sayHello(name) { 
      return `Hello ${name}`;
    }
    function say(callback) { 
      callback('aaa');
    }
    it('Test sayHello function run correctly', () => { 
      const mockFunc = jest.fn(sayHello);
      say(mockFunc);
      // toHaveBeenCalled:判断Mock函数是否被调用 
      expect(mockFunc).toHaveBeenCalled();
      // toHaveBeenCalledWith:判断Mock函数被调用时的参数 
      expect (mockFunc) .toHaveBeenCalledWith('aaa');
      say(mockFunc);
      // toHaveBeenCalledTimes:判断Mock函数被调用的次数 
      expect(mockFunc).toHaveBeenCalledTimes(2);
      // toHaveReturned:判断Mock函数是否有返回值 
      expect(mockFunc).toHaveReturned();
      // toHaveReturnedWith:判断Mock函数被调用时的返回值 
      expect (mockFunc) .toHaveReturnedWith('Hello'); 
    });
    ```

    * 保证断言调用
    ```js
    it('promise resolve' , () => {
      return fetch('/example').then((res) => { 
        expect(res).toEqual({ code: '200', data: {}, msg: 'success' });
      });
    });
    it('promise reject', () => { 
      expect.assertions(1);//保证1条断言被调用 
      return fetch('/example').catch((error) => { 
        expect(error).toMatch('error');
      });
    });
    it('async/await resolve', async () => { 
      const res = await fetch('/example'); 
      expect(res).toEqual({ code: '200', data: {}, msg: 'success' });
    });
    it('async/await reject', async () => { 
      expect.assertions(1);//保证1条断言被调用 
      try {
        await fetch('/example');
      } catch (err) { 
        expect(err).toMatch('error');
      }
    });
    ```

    * 单元测试组块、执行顺序
    ```js
    describe('outer', () => {
      console.log('describe outer-a');
      describe('describe inner 1', () => { 
        console.log('describe inner 1'); 
        test('test'  , () => {
          console.log('test for describe inner 1'); 
          expect(true).toEqual(true);
        });
      });
      console.log('describe outer-b');
      test('test 1', () => {
        console.log('test for describe outer'); 
        expect(true).toEqual(true);
      });
      describe('describe inner 2', () => { 
        console.log('describe inner 2'); 
        test('test for describe inner 2', () => { 
          console.log('test for describe inner 2'); 
          expect(false).toEqual(false);
        });
      });
      console.log('describe outer-c');
    });
    // describe outer-a 
    // describe inner 1 
    // describe outer-b 
    // describe inner 2 
    // describe outer-c 
    // test for describe inner 1 
    // test for describe outer 
    // test for describe inner 2
    ```

    * 请求返回值
    ```js
    //推荐
    it('best method', () => {
      return expect(fetch('./example')).resolves.toEqual({ 
        code: '200', 
        data: {}, 
        msg: 'success'
      });
    });
    it('best method', () => {
      return expect(fetch('./example')).rejects.toMatch('error');
    });
    it('best method', async () => { 
      await expect(fetch('./example')).resolves.toEqual({ 
        code: '200', 
        data: {}, 
        msg: 'success' 
      });
    });
    it('best method', async () => { 
      await expect(fetch('./example')).rejects.toMatch('error');
    });
    ```

    * 生命周期
    ```js
    // 生 命 周 期 钩 子
    beforeAll(() => console.log('1 - beforeAll')); 
    afterAll(() => console.log('1 - afterAll')); 
    beforeEach(() => console.log('1 - beforeEach')); 
    afterEach(() => console.log('1 - afterEach')); 
    test('', () => console.log('1 - test')); 
    describe('Scoped / Nested block', () =>  {
      beforeAll(() => console.log('2 - beforeAll')); 
      afterEach(() => console.log('2 - afterAll')); 
      beforeEach(() => console.log('2 - beforeEach')); 
      afterEach(() => console.log('2 - afterEach')); 
      test('', () => console.log('2 - test'));
    });
    // 1 - beforeAll 
    // 1 - beforeEach 
    // 1 - test 
    // 1 - afterEach 
    // 2 - beforeAll 
    // 1 - beforeEach 
    // 2 - beforeEach 
    // 2 - test 
    // 2 - afterEach 
    // 1 - afterEach 
    // 2 - afterAll 
    // 1 - afterAll
    ```

## vue2单元测试

1. 参考链接

    [马上就2021年了，你还不懂怎么在vue做单元测试？](https://juejin.cn/post/6903690374158974989)

    [单元测试（二）—— Jest结合Vue-test-utils入门实战](https://blog.csdn.net/sinat_33312523/article/details/82966085)

2. 详解

    * 添加测试框架

      vue add unit-jest 

      执行这句命令就可以，执行完后，项目根目录会多出一个tests文件夹，这里存放所有单元测试代码,文件后缀为.spec.js。npm run test:unit之后这些文件就会被执行

    * 针对代码进行测试

      组件
      ```js
      export default {
        data:()=>({
          text:'',
          list:[32]
        }),
        created() {
          this.getList()
        },
        methods:{
          async getList(){
            let data = await axios.get('http://192.168.22.36:3000/unit')
            this.list = [...this.list,...data.data.list]
          },
          addList(){
            this.list.push(this.text || 'hahaha')
            this.text = ''
          },
          del(item){
          this.list = this.list.filter(list=>list.id !== item.id)
          }
        }
      }
      ```

      单元测试
      ```js
      import { shallowMount } from '@vue/test-utils'//帮助DOM元素抓取的库
      import Todo from '@/components/Todo.vue'//引入要测试的组件
      import Axios from 'axios'

      //测试data
      describe('data实例', () => {
        it('text', () => {
          expect(typeof Todo.data().text).toBe('string');
        });
        it('list ', () => {
          expect(Array.isArray(Todo.data().list)).toBeTruthy();
        });
      });

      describe('增', () => {
        it('添加数据', () => {
          const warp = shallowMount(Todo);
          warp.find('.add').trigger('click').then(()=>{
            expect(warp.vm.list.length).toBeGreaterThan(Todo.data().list.length);
          });
        });
      });

      describe('删', () => {
        it('删除数据', () => {
          const warp = shallowMount(Todo);
          warp.find('.del').trigger('click').then(()=>{
            expect(warp.vm.list.length).toBeLessThan(Todo.data().list.length);
          });
        });
      });

      describe('查', () => {
        it('查询数据', async () => {
          const warp = shallowMount(Todo);
          await warp.vm.getList()
          expect(warp.vm.list.length).toBeGreaterThan(Todo.data().list.length);
        });
      });

      describe('检查接口', () => {
        it('检查接口', async () => {
          let { data } = await Axios.get('http://192.168.22.36:3000/unit')
          expect(data.code).toBe(0)
        });
      });
      ```

    * 执行

      npm run test:unit

    * 测试覆盖率

      jest.config.js
      ```js
      module.exports = {
        preset: '@vue/cli-plugin-unit-jest',
        collectCoverage:true,
        collectCoverageFrom:['src/components/*.vue'] //我只做components目录下vue文件测试
      }
      ```

## vue2单元测试添加到现有项目

1. 参考链接

    [vue-test-utils-jest](https://github.com/YalongYan/vue-test-utils-jest)

    [vue-select](https://github.com/sagalbot/vue-select)

    [Vue Test Utils](https://vue-test-utils.vuejs.org/zh/guides/)

    [Jest Using With Wbpack](https://jestjs.io/docs/zh-Hans/webpack#%E5%A4%84%E7%90%86%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6)

    [使用jest对vue项目进行单元测试](https://segmentfault.com/a/1190000016299936)

    [ui组件如何进行单元测试](https://segmentfault.com/q/1010000006970956)

    [Jest Mock](https://blog.csdn.net/sinat_33312523/article/details/82970655)

    [用Jest测试Vue中的Methods中的方法和Mock依赖](https://www.jianshu.com/p/41eadb6409ba)

2. 详解

    * 概念

        1. 单元测试（unit测试）

            单元测试是把代码看成是一个个的组件，从而实现每一个组件的单独测试，测试内容主要是组件内每一个函数的返回结果是不是和期望值一样。

        2. 端到端测试（e2e测试）

            e2e测试是把程序作为黑盒子，只负责打开浏览器，把测试内容在页面上输入一遍。

    * 过程

        1. 使用vue-cli初始化webpack4.0项目
        2. npm i @vue/test-utils babel-jest jest jest-serializer-vue jest-transform-stub vue-jest -D
            ```js
            "@vue/test-utils": "^1.0.0-beta.13"
            "babel-jest": "^21.0.2"
            "jest": "^22.0.4"
            "jest-serializer-vue": "^0.3.0"
            "jest-transform-stub": "^2.0.0"
            "vue-jest": "^1.0.2"
            ```
        3. 修改.babelrc配置
            ```js
            {
              "presets": [
                ["env", { "modules": false }]
              ],
              "env": {
                "test": {
                  "presets": ["env"]
                }
              }
            }
            ```
        4. jest.conf.js
            ```js
            const path = require('path');

            module.exports = {
                verbose: true,
                testURL: 'http://localhost/',
                rootDir: path.resolve(__dirname, '../../'),
                moduleFileExtensions: [
                    'js',
                    'json',
                    'vue'
                ],
                moduleNameMapper: {
                    '^@\/(.*?\.?(js|vue)?|)$': '<rootDir>/src/$1',   // @路径转换，例如：@/components/Main.vue -> rootDir/src/components/Main.vue
                    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/unit/__mocks__/fileMock.js', // 模拟加载静态文件
                    '\\.(css|less|scss|sass)$': '<rootDir>/test/unit/__mocks__/styleMock.js'　　// 模拟加载样式文件   
                },
                testMatch: [ //匹配测试用例的文件
                    '<rootDir>/test/unit/specs/*.spec.js'
                ],
                transform: {
                    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
                    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
                },
                testPathIgnorePatterns: [
                    '<rootDir>/test/e2e'
                ],
                // setupFiles: ['<rootDir>/test/unit/setup'],
                snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
                coverageDirectory: '<rootDir>/test/unit/coverage', // 覆盖率报告的目录
                collectCoverageFrom: [ // 测试报告想要覆盖那些文件，目录，前面加！是避开这些文件
                    // 'src/components/**/*.(js|vue)',
                    'src/components/*.(vue)',
                    '!src/main.js',
                    '!src/router/index.js',
                    '!**/node_modules/**'
                ]
            }
            ```
        5. .eslintrc(jest.conf.js同目录)
            ```js
            {
              "env": { 
                "jest": true
              }
            }
            ```
        6. fileMock.js处理文件
            ```js
            module.exports = 'test-file-stub';
            ```
        7. styleMock.js处理样式
            ```js
            module.exports = {}
            ```
        8. package.json
            ```json
            "unit": "jest --config test/unit/jest.conf.js --coverage"
            ```
        9. 根据jest语法写.spec.js

