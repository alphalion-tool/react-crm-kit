const allRoutes = [
    {
        id: 'dashboard',
        lang_id: 'nav.dashboard',
        route: '/dashboard',
        icon: 'dashboard'
    },
    {
        id: 'accounts',
        lang_id: 'nav.accounts',
        route: '/accounts',
        icon: 'team',
        // module: 'account:query'
    },
    {
        id: 'withdraws',
        lang_id: 'nav.withdraws',
        route: '/withdraws',
        icon: 'eye',
    },
    {
        id: 'orders',
        lang_id: 'nav.orders',
        route: '/orders',
        icon: 'database',
        // module: 'order:query'
    },
    {
        id: 'deposits',
        lang_id: 'nav.deposits',
        route: '/deposits',
        icon: 'dollar'
    },
    {
        id: 'wallets',
        lang_id: 'nav.wallets',
        route: '/wallets',
        icon: 'wallet'
    },
    {
        id: 'maintenance',
        lang_id: 'nav.maintenance',
        icon: 'setting',
        children: [
            {
                id: 'nav.users',
                lang_id: 'nav.users',
                route: '/users',
                icon: 'team'
            },
            {
                id: 'nav.logs',
                lang_id: 'nav.logs',
                route: '/logs',
                icon: 'audit'
            },
            {
                id: 'nav.help',
                lang_id: 'nav.help',
                route: '/help',
                icon: 'smile'
            }
        ]
    },
    {
        id: 'nav.new.user',
        lang_id: 'nav.new.user',
        route: '/new/user',
        hidden: true
    },
    {
        id: 'nav.index',
        lang_id: 'nav.dashboard',
        route: '/',
        hidden: true,
        icon: 'dashboard'
    },
    {
        id: 'nav.settings',
        lang_id: 'nav.settings.security',
        route: '/settings/security',
        hidden: true,
        icon: 'lock'
    }
];

const sideRoutes = allRoutes.filter((item) => !item.hidden);

export { 
    allRoutes as default,
    sideRoutes
}
