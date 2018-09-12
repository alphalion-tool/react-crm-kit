## React CRM Kit for Cryptocurrency Exchange
该项目来源于公司内部的一个产品（金融相关），产品涉及到多达200个模块、用户权限管理、多语言等特性。在项目完成之际，在移除了内部的业务、组件库、分屏、权限管理等功能后，将框架开源出来，方便其他人使用，同时也想让更多人参与到架构优化中。目前使用组件库[Antd](https://ant.design/)，图标库则使用[BizCharts](https://alibaba.github.io/BizCharts/index.html)，依托于`redux`进行本地数据管理，路由使用`react-router`中的hash方式，测试方面，使用`jasmine`作为单元测试runner。整个项目的数据是使用的假数据，模拟的是加密货币交易所内部的管理系统。开发上则前后端分离的开发方式，所以部署时需要约束静态文件目录位置，以及模板里的数据内容。同时使用react flow作为类型检测。


[Demo View](http://ex.bitbal.top)    用户名和密码任意


### 1，快速使用
    
    git clone https://github.com/alphalion-tool/react-crm-kit.git
    cd react-crm-kit && yarn install
    npm run server // 打开本地的server
    npm run dev

    在浏览器中打开：http://localhost:8082

    // 编译
    npm run build


### 2，依赖包
#### 2.1 front
- react v16
- react-router v4.2
- redux v3.6
- webpack v4.6    
    使用了happypack, dll
- antd v3.9.1
- bizcharts v3.2.2


#### 2.2 server
- mongoose v5.x
- express v4.x


### 3，package.json 中的 scripts

    A，开发、部署、测试相关：

        `npm run dev`    
            // 开发模式，开启webpack，此时页面中使用静态文件是从`src`中实时产生的

        `npm run server`    
            // 开启server，此时页面用到的静态文件是从`build`中获取的。可作为部署(仅当所有的server代码存在于当前的项目中)

        `npm run build`     
            编译成最终静态文件，放在`build`目录中，连同前后端约定的模板。    
            `build/static`为所有的静态文件目录    
            `build/templates`是前后端的页面模板，多数情况下只需要一个首页模板即可

        `npm run test`    
            // 运行测试用例，最终结果在`_reports/test/html/JSDOM-test-report.html`    
        `npm run coverage`    
            // 运行测试并给出测试覆盖率汇总，执行结果放在`_reports/coverage/lconv-report/index.html`  

    
    B，校验相关：


        `npm run flow`    
            // flow校验

        `npm run lintgit`        
            // eslint校验，只校验当次git记录中修改的

        `npm run lint`    
            // eslint校验

        `npm run lintquiet`    
            // eslint校验，只显示有错的，warning不显示

        `npm run stylelintgit`    
            // stylelint校验，只校验本次修改的    

        `npm run csslintgit`    
            // css lint 校验，只校验本次修改的


### 4，目录结构说明
     
     // 文件目录说明
     |----- build     // 执行npm run build后文件放置的位置
     |----- mock      // mock-server功能文件，实现了server api的请求代理，以及路由静态文件
     |----- node_modules   
     |----- scripts   // 功能性脚本
     |----- server  // 服务端文件，实现了server api的请求代理，以及路由静态文件
     |----- shells  // shell脚本，部署等脚本
     |----- src       // 前端js/css/img/font/locale等文件的目录
     |----- test   // 测试用到的环境
     |----- .babelrc
     |----- .eslintrc.js
     |----- package.json
     |----- webpack.common.js     // webpack公用配置
     |----- webpack.config.js     // webpack dev 时配置 （即开发过程）
     |----- webpack.build.js  // webpack product 时配置  (即上线状态)
     |----- webpack.dll.js   // webpack dll 

### 5，环境搭建、配置修改、开发、上线
环境至少包含node, yarn    

#### 5.1，环境搭建
- `yarn install`   
    安装依赖的包     
        
#### 5.2，开发过程
- `npm run server`  开启本地server，配置可在server/config/prod.config.json中修改
- `npm run dev`  开启webpack dev server，配置可在webpack-dev-server/config.json中修改

#### 5.3，代码校验
##### js方面
- `npm run lintgit`  用eslint校验目前git记录中更改的文件      
- `npm run lint`  用eslint校验所有的文件。
- `npm run lintquiet`
- [js规范](https://github.com/alphalion-tool/frontend-standard/blob/master/js.md)

##### css方面
- `npm run stylelint` 查看所有文件的stylelint结果
- `npm run stylelintgit` 查看当前修改的文件的stylelint结果
- [css规范](https://github.com/alphalion-tool/frontend-standard/blob/master/css.md)

##### 其他
- 在`git commit`时会自动对js进行校验。校验规则见[git commit msg](https://github.com/alphalion-tool/frontend-standard/blob/master/git.md)


#### 5.4，上线前
- `npm run build`（webpack将压缩文件打包至build目录中）     

#### 5.5， 测试要求

    测试内容需要包含如下：
        schema
        action
        reducer
        components
        util
        container

    Covarage要求：
        Functions   90%
        Branches    90%
        Statement   80%
    

