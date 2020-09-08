# 单元测试Puppeteer

* [安装与基础使用](#安装与基础使用)
* [使用样例](#使用样例)

---

## 安装与基础使用

1. 参考链接

    [Jest测试框架入门](https://www.bbsmax.com/A/ZOJPepll5v/)

    [使用Jest测试JavaScript (入门篇)](https://www.jianshu.com/p/70a4f026a0f1)

    [Jest + Puppeteer 界面自动化测试](https://blog.csdn.net/qq_33303090/article/details/95041159)

    [webpack打包踩坑之TypeError: Cannot read property 'bindings' of null](https://www.cnblogs.com/Joe-and-Joan/p/10335881.html)

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

## 使用样例

1. 参考链接

    [不想痛失薪资普调和年终奖？试试自动化测试！（基础篇）](https://juejin.im/post/5eeae4f7e51d4574195ed982)

    [Jest](https://www.jianshu.com/p/c2fef6b2820f)

    [Jest Docs](https://jestjs.io/docs/en/getting-started)

2. 详解

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
      expect(sum(1, 2)).toBeLessThan0rEqual(3);
      expect(n).toBeNull(); //判断是否为null
      expect(value).toBeCloseTo(0.3); // 浮点数判断相等
      expect('Christoph').toMatch(/stop/); //正则表达式判断
      expect(['one','two']).toContain('one'); //包含判断ss
      });
    });
    ```

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