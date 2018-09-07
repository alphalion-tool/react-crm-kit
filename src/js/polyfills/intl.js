
// 针对ie9浏览器

if (!window.Intl) {
    require('intl');
    // require('intl/locale-data/complete.js');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/zh-Hans-CN.js');
}