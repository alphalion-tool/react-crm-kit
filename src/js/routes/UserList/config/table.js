
import * as WIDTHS from 'jscom/config/constants/table';

const columns = [
    {
        title: 'User ID',
        key: 'userId',
        dataIndex: 'userId',
        width: WIDTHS.CELL_WIDTH,
        fixed: true,
        cellClassName: 'cell--link',
        sort: {
            type: 'number'
        },
        filter: {
            type: 'number'
        }
    },
    {
        title: 'User Name',
        key: 'userName',
        dataIndex: 'userName',
        width: WIDTHS.CELL_WIDTH,
        fixed: true,
        cellClassName: 'cell--link',
        sort: {
            type: 'alphabet',
        },
        filter: {
            type: 'string'
        }
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        width: WIDTHS.EMAIL_WIDTH,

        sort: {
            type: 'alphabet'
        },
        filter: {
            type: 'string'
        }
    },
    {
        title: 'First Name',
        key: 'firstName',
        dataIndex: 'firstName',
        width: WIDTHS.CELL_WIDTH,

        sort: {
            type: 'alphabet'
        },
        filter: {
            type: 'string'
        }
    },
    {
        title: 'Last Name',
        key: 'lastName',
        dataIndex: 'lastName',
        width: WIDTHS.CELL_WIDTH,
        sort: {
            type: 'alphabet'
        },
        filter: {
            type: 'string'
        }
    },
    {
        title: 'Phone',
        key: 'phone',
        dataIndex: 'phone',
        width: WIDTHS.CELL_WIDTH,
        sort: {
            type: 'alphabet'
        },
        filter: {
            type: 'string'
        }
    }
];

const tableTools = [
    { name: 'add' }, { name: 'export' }, { name: 'filter' }, { name: 'setting' }
];

export function processTabelItem (item) {
    return {
        ...item,
        key: item.userId,
    };
}

export function processTableData (arr = []) {
    return arr.map(item => processTabelItem(item));
}

export function getTableToolConfig (props) {
    let tools = [];
    if (props.checkPermission('user', 'add')) {
        tools.push(tableTools[0]);
    }
    // if (props.checkPermission('user', 'query')) {
    //     tools.push(tableTools[1]);
    // }
    tools.push(tableTools[2]);
    tools.push(tableTools[3]);
    return tools;
}

export {
    columns,
}