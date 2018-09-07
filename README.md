## React CRM Kit for Cryptocurrency Exchange

### Quick Overview
    
    yarn install
    npm run dev

    open http://localhost:8082

[Demo](http://ex.bitbal.top)

### Packages
- React v16
- react-router v4.2
- redux v3.6
- webpack v4.6


### package.json scripts
- `npm run flow`    
    flow check
- `npm run test`    
    test
- `npm run coverage`
    testing coverage, results located `_reports/coverage/lconv-report/index.html`
        
        Covarage standard
        Functions   90%
        Branches    90%
        Statement   80%

- `npm run build`     
    build static file, results located `build`
- `npm run dev`    
    development mode, will serve static file from `src`
- `npm run prod`    
    prodution or online, will serve static file from `build`
- `npm run lintgit`        
    eslint校验，只校验本次修改的
- `npm run lint`    
    eslint校验
- `npm run lintquiet`    
    eslint校验，只显示有错的，warning不显示
- `npm run stylelintgit`    
    stylelint校验，只校验本次修改的    
- `npm run csslintgit`    
    同上


## 1，说明
     
     // 文件目录说明
     |----- build     // 执行npm run build后文件放置的位置
     |----- dist      // npm run webpack 后的静态文件位置，即开发过程中的文件位置
     |----- mock      // mock-server功能文件，实现了server api的请求代理，以及路由静态文件
     |----- node_modules   
     |----- scripts   // 功能性脚本
     |----- server  // 服务端文件
     |----- shells  // 脚本
     |----- src       // 前端js/css/img/font等文件的目录
     |----- test   // 测试用到的基础入口
     |----- .babelrc
     |----- .eslintrc.js
     |----- package.json
     |----- README-CSS.md
     |----- README-JS.md
     |----- README.md
     |----- webpack.common.js     // webpack公用配置
     |----- webpack.config.js     // webpack dev 时配置 （即开发过程）
     |----- webpack.build.js  // webpack product 时配置  (即上线状态)
     |----- webpack.dll.js   // webpack dll 

## 2，环境搭建、配置修改、开发、上线
环境至少包含node, webpack, npm, eslint    


### 2.1，环境搭建
- `yarn install`   
    安装依赖的包     
        
### 2.2，开发过程

### 2.3，代码校验
#### js方面
- `npm run lintgit`  用eslint校验目前更改的文件。(`git status`后显示的文件)      
- `npm run lint`  用eslint校验所有的文件。
- `npm run lintquiet`

#### css方面
- `npm run stylelint` 查看所有文件的stylelint结果
- `npm run stylelintgit` 查看当前修改的文件的stylelint结果

#### 其他
- 在`git commit`时会自动对js进行校验。


### 2.4，上线前
- `npm run lint`  (eslint对js校验)
- `npm run build`（webpack将压缩文件打包至resources目录）     

## 打包代码大小分析（用于优化）    
使用[webpack-bundle-size-analyzer](https://github.com/robertknight/webpack-bundle-size-analyzer)    
    
    npm install -g webpack-bundle-size-analyzer
    webpack --json | webpack-bundle-size-analyzer

或使用[webpack-visualizer-plugin](https://www.npmjs.com/package/webpack-visualizer-plugin)    

### 2.5，调试
使用[redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)监听action操作    
使用[react-addons-perf](https://facebook.github.io/react/docs/perf.html)来监控性能问题     



    
## 3，前端目录结构说明


### 权限管理
#### 实现原理
基于React context方法来实现的，类似redux，intl这样的实现方式

#### 使用
- 高阶组件
    connectPermission方法
- 内嵌组件
    WithPermission

### 软件版本
- node 6.12 -> 可以提升至8.x LTS建议升至最新稳定版
    安装方式见：https://nodejs.org/en/download/package-manager/

        curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
        sudo yum -y install nodejs

- yarn 最新版(1.3.2)
    安装详情见：https://yarnpkg.com/lang/en/docs/install/

        curl -o- -L https://yarnpkg.com/install.sh | bash
- phantomjs (2.1.1)  (目前不需要)
    安装详情见：http://phantomjs.org/build.html

        sudo yum -y install gcc gcc-c++ make flex bison gperf ruby \
            openssl-devel freetype-devel fontconfig-devel libicu-devel sqlite-devel \
            libpng-devel libjpeg-devel
        

        git clone git://github.com/ariya/phantomjs.git
        cd phantomjs
        git checkout 2.1.1
        git submodule init
        git submodule update

        python build.py


### Mock 平台
- chrome插件（可以让部分接口走mock）

    [mock-helper](https://github.com/alphalion-tool/mock-helper)


### 发送PR规范
见[gitlab](https://github.com/alphalion-tool/frontend-standard/blob/master/gitlab.md)

### 测试要求

    测试内容需要包含如下：
    
    model
    action
    reducer
    components
    util
    container
    

