import Auth from './Auth';
import AccountList from './AccountList';
// import Maintenance from './Maintenance';
import UserList from './UserList';
import UserNew from './UserNew';
import Help from './Help';
import Settings from './Settings';
// import UserInfo from './UserInfo';
// import Tools from './Tools';

const baseRoutes = [
    // Welcome,
    Auth,
    AccountList,
    UserList,
    Help,
    Settings,

    // top nav
    // Maintenance,
    // Tools,

    // 新增、编辑
    UserNew,
    // UserInfo,
];

if (process.env.NODE_ENV === 'development') {
    // baseRoutes.unshift(Demo);
}

// 处理route中的childRoutes情况
function processRouteConfig(routes = []) {
    const tmpRoutes = [];
    routes.forEach((item) => {
        if (Array.isArray(item)) {
            tmpRoutes.push(...processRouteConfig(item));
        } else {
            tmpRoutes.push(item);
            if (item.childRoutes && item.childRoutes.length) {
                tmpRoutes.push(...item.childRoutes.map((innerItem) => ({ ...innerItem, component: item.component })));
            }
        }
    });
    return tmpRoutes;
}

const routeConfig = processRouteConfig(baseRoutes);

export const getRouteName = path => {
    for (let i = 0; i < routeConfig.length; i++) {
        const item = routeConfig[i];
        if (item.path === path || (item.props && item.props.path === path)) {
            return item.name;
        }
    }
    return '';
};

export {
    routeConfig as config,
    routeConfig as default
};