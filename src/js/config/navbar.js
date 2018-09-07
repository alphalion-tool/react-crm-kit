
import routes, { sideRoutes } from './routes';

function navItemWithPermission(item, permission = {}) {
    // 如果没有定义module，意味着不需要权限即可展示
    if (!item.module) return true;

    // 不存在的话，一律不显示，返回false
    function judge(module) {
        if (!module) return true;
        const tmpArr = module.split(':'),
            m = tmpArr[0], // 模块
            p = tmpArr[1]; // 具体权限

        const pCur = permission[m];
        if (pCur && pCur[p] === true) return true;
        return false;
    }

    const modules = item.module;
    if (Array.isArray(modules)) {
        for (let i = 0, len = modules.length; i < len; i++) {
            if (judge(modules[i])) {
                return true;
            }
        }
        return false;
    } else {
        return judge(modules);
    }
}

// 按照权限获取新的nav
function navWithPermission(navs = [], permission) {
    const newNav = [];
    for (let i = 0, len = navs.length; i < len; i++) {
        const item = navs[i];
        if (navItemWithPermission(item, permission)) {
            if (item.children && item.children.length) {
                item.children = navWithPermission(item.children, permission);
            }
            newNav.push(item);
        }
    }
    return newNav;
}

// 将nav转换成一层，不含嵌套的关系
function flattenNav(navs = [], parent = null) {
    let newNav = [];
    navs.forEach((item) => {
        // 将父子进行关联
        if (parent) {
            item.parent = [parent];
            if (parent.parent) item.parent = item.parent.concat(parent.parent);
        }
        newNav.push(item);
        if (item.children && item.children.length) {
            newNav = newNav.concat(flattenNav(item.children, item));
        }
    })
    return newNav;
}

// 根据router获取被选中的navitem，仅有一层，不会去判断嵌套关系
function getNavItemWithRoute(route, navs) {
    return navs.find((nav) => nav.route === route);
}


export {
    routes as default,
    sideRoutes,
    navWithPermission,
    flattenNav,
    getNavItemWithRoute
}
