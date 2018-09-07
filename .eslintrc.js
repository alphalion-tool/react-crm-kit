const path = require('path');

module.exports = {
    "parser": "babel-eslint",
    "extends": [ "airbnb", "plugin:import/errors", "plugin:import/warnings" ],
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "flowtype"
        // "babel"
    ],
    // 需要忽略的校验
    "globals": {
        "BLog": true,
        "React$Element": true,
        "React": true,
        "React$Component": true,
        "__DEV__": true,
        "SyntheticInputEvent": true,
        "SyntheticMouseEvent": true,
        "SyntheticEvent": true,
        "moment$Moment": true,

        // for test
        "describe": true,
        "it": true,
        "expect": true,
        "beforeEach": true,
        "afterEach": true,
        "jasmine": true,
        "beforeAll": true,
        "afterAll": true,
        "xit": true,
        "xdescribe": true,
        "fit": true,
        "fdescribe": true,
        "spyOn": true,
        "ReactClass": true
    },
    "env": {
    	"browser": true,
    	"amd": true,
    	"commonjs": true,
    	"jquery": true,
        "es6": true,
    },
    "rules": {
    	"indent": [1, 4, {"SwitchCase": 1}],
    	"no-var": 0,
    	"func-names": 0,
    	"eol-last": "off",
    	"padded-blocks": "off",
    	"no-tabs":"off",
    	"space-in-parens": "off",
    	"wrap-iife": "off",
    	"space-before-blocks": 2,   
    	"space-before-function-paren": "off",
    	"no-trailing-spaces": [2, {"skipBlankLines": true }],
        "keyword-spacing": 2,
        "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 5 }],
        "comma-dangle": "off",
        "strict": [0, "global"],
        "no-plusplus": "off",
        "no-else-return": "off",
        "import/no-extraneous-dependencies": "off", 
        "import/no-duplicates": 1,
        "no-duplicate-imports": 1,
        "max-len": [2, 300, 4],
        "one-var": "off",
        "arrow-body-style": "off",
        "no-unused-vars": 1, 
        "no-trailing-spaces": 1,
        "arrow-parens": [1, "as-needed"],
        "import/imports-first": "off",   // 导入绝对路径要早于相对路径问题
        "prefer-const": 1, 
        "object-shorthand": 1,
        "no-multi-spaces": 1,
        "no-underscore-dangle": 1,   // 下划线变量
        "no-param-reassign": ["error", { "props": false }],
        "semi": 1, // 分号
        "object-curly-spacing": 2,  // {} 空格
        "no-multiple-empty-lines": 1,
        "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
        "no-nested-ternary": "off",  // 允许嵌套三元运算符 http://eslint.org/docs/rules/no-nested-ternary
        "no-unneeded-ternary": ["error", { "defaultAssignment": true }],
        "no-continue": 1,  // 允许continue
        "global-require": 1,
        "class-methods-use-this": 1,
        "no-console": 2,
        "prefer-rest-params": 1,

        // react js
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/label-has-for": "off",   // label必须有htmlFor属性
        "react/jsx-boolean-value": "off",
        "react/prefer-stateless-function": "off",   // 查找无状态组件
        "jsx-a11y/no-static-element-interactions": "off",  // 非交互型元素不允许有交互
        "react/no-unused-prop-types": 1,
        "react/prop-types": 2,
        "react/forbid-prop-types": "off",
        "jsx-a11y/anchor-has-content": [0],
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        
        // "react/no-redundant-should-component-update": 2,
        // "react/no-typos": 2,

        // warning
        
        "no-useless-constructor": 1,
        "react/no-string-refs": [2],
        "react/sort-comp": [2, { 
            order: [ 'type-annotations', 'static-methods', 'lifecycle', 'refresize', 'everything-else', 'handleing', 'rendering'],
            groups: {
                rendering: ['/^render.+$/', 'render'],
                handleing: ['/^handle.+$'],
                refresize: ['resizeComponent', '/^ref.+Set$/'],
                lifecycle: [
                  'displayName',
                  'propTypes',
                  'contextTypes',
                  'childContextTypes',
                  'mixins',
                  'statics',
                  'defaultProps',
                  'constructor',
                  'getDefaultProps',
                  'getInitialState',
                  'state',
                  'getChildContext',
                  'componentWillMount',
                  'componentDidMount',
                  'componentWillReceiveProps',
                  'shouldComponentUpdate',
                  'componentWillUpdate',
                  'componentDidUpdate',
                  'componentWillUnmount'
                ]
            }
        }],

        "react/no-find-dom-node": 1,
        "react/react-in-jsx-scope": 2,
        // "one-var-declaration-per-line": "initializations",
        "jsx-a11y/href-no-hash": 1,
        "react/require-optimization": [2, { allowDecorators: ['immutableInject'] }],
        // "react/boolean-prop-naming": ["error", { "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+" }],
        "react/no-direct-mutation-state": 2,
        "react/style-prop-object": 2
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                config: 'webpack.config.js'
            }
        }
    }
}
