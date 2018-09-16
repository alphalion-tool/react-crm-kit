/* @flow */

/**
 * @module utils/window
 * @description 窗口操作工具
 */

import queryString from 'query-string';
import browserHistory from './history';

let companyInfoCount = 0;
let companyNewCount = 0;

const companyInfoPrefix = 'companyInfo';
const companyNewPrefix = 'companyNew';

const windowMap = {
    companyInfo: true,
    companyNew: true,
};

// 已经打开的window
const openArr = [];
const openMap = {};

// 记录窗口
function addWindow(name: string, win: any) {
    const item = { name, win };
    openArr.push(item);
    openMap.name = item;
}

export const commonFeatures = 'modal=yes,alwaysRaised=yes,height=600,width=600,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no';

/**
 * @memberOf module:utils/window
 * @description 公共打开页面的函数
 * @param  {String}  url      需要打开的url
 * @param  {String}  name     打开窗口的名字
 * @param  {String}  features 打开窗口的特性
 * @param  {Boolean} replace  是否是替代原有的histroy
 */
function openWindow(url: string, name: string, features?: string = commonFeatures, replace?: bool = true) {
    const newUrl = `#${url}`;
    const win = window.open(newUrl, name, features, replace);
    addWindow(name, win);
}

/* 打开一个内置的tab栏 */
function openTab(url: string, refresh?: bool) {
    let refreshUrl = url;
    if (refresh) {
        if (refreshUrl.indexOf('?') !== -1) {
            refreshUrl += `&${Date.now()}`;
        } else {
            refreshUrl += `?${Date.now()}`;
        }
    }
    const stateData = {
        path: refreshUrl,
        scrollTop: 0
    };
    browserHistory.push(refreshUrl);
    // window.location.hash = refreshUrl;
}


/**
 * @memberOf module:utils/window
 * @description 打开company详情
 * @param {String} companyId 需要打开的companyId
 * @param {Boolean} newWindow 是否在已经有的company窗口打开
 */
function openCompanyInfo(companyId: number | string, newWindow?: bool, replace?: bool) {
    if (!companyId) return;
    let name = `${companyInfoPrefix}-${companyInfoCount}`;
    if (replace) {
        name = `${companyInfoPrefix}-${++companyInfoCount}`;
    }
    const url = `/company/${companyId}`;
    if (newWindow) openWindow(url, name);
    else openTab(url);
}


function openUserInfo(userId: number | string, newWindow?: bool, replace?: bool) {
    if (!userId) return;
    const name = 'User Info';
    const url = `/user/${userId}`;
    if (newWindow) openWindow(url, name);
    else openTab(url);
}


type pageType = 'account' | 'accountGL' | 'broker' | 'customer' |
    'company' | 'product' | 'correspondent' | 'office' | 'custodian' | 'middleMoney' |
    'registerRep' | 'user' | 'role' | 'fxAccount' | 'clientprofile' | 'fxMiddleMoney';

/**
 * @memberOf module:utils/window
 * @description 打开一个新建页面，诸如新建用户，公司等
 * @param {String} type 需要打开的类型，目前有account, company, product, correspondent
 * @param {Boolean} newWindow 是否在已经有的correspondent窗口打开
 */
function openCreatePage(type: pageType, newWindow?: bool, replace?: bool) {
    let name = '',
        url = '';
    switch (type) {
    
        case 'company':
            name = replace ? `${companyNewPrefix}-${companyNewCount++}` : `${companyNewPrefix}-${companyNewCount++}`;
            url = '/new/company';
            break;
        case 'user':
            name = 'create user';
            url = '/new/user';
            break;
        default:
            break;
    }
    openTab(url);
}



function gotoLoginPage(reload?: bool) {
    openTab('/auth/login');
    if (reload) {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
}

function gotoRegisterPage() {
    openTab('/auth/register');
}

function openSettingSecurityPage() {
    openTab('/settings/security');
}

/**
 * @memberOf module:utils/window
 * @description 判断当前窗口是否是被打开的弹出的窗口
 * @return {Boolean} 判断后的结果
 */
function isOpenWindow() {
    // return true;
    if (windowMap[window.name.split('-')[0]]) return true;
    return false;
}


export {
    openCompanyInfo,
    openUserInfo,
    openCreatePage,
    gotoLoginPage,
    gotoRegisterPage,
    isOpenWindow,
    openSettingSecurityPage,
    openWindow,
    openTab,
};
