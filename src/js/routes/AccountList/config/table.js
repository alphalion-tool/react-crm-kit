
import * as WIDTHS from 'jscom/config/constants/table';

const columns = [
    {
        title: 'ACC ID',
        key: 'accountId',
        dataIndex: 'accountId',
        width: WIDTHS.CELL_WIDTH,
        // fixed: true,
    },
    {
        title: 'ACC Name',
        key: 'accountName',
        dataIndex: 'accountName',
        width: WIDTHS.CELL_WIDTH,
    },
    {
        title: 'ID Type',
        key: 'idType',
        dataIndex: 'idType',
    },
    {
        title: 'ID Number',
        key: 'idNumber',
        dataIndex: 'idNumber',
    },
    {
        title: 'Level',
        key: 'level',
        dataIndex: 'level'
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        width: WIDTHS.EMAIL_WIDTH,
    },
    {
        title: 'First Name',
        key: 'firstName',
        dataIndex: 'firstName',
        width: WIDTHS.CELL_WIDTH,
    },
    {
        title: 'Last Name',
        key: 'lastName',
        dataIndex: 'lastName',
    },
    {
        title: 'Phone',
        key: 'phone',
        dataIndex: 'phone',
        width: WIDTHS.CELL_WIDTH,
    },
    {
        title: 'Country',
        key: 'country',
        dataIndex: 'country',
        width: WIDTHS.CELL_WIDTH,
    },
];

export function processTabelItem (item) {
    return {
        ...item,
        key: item.accountId,
    };
}

export function processTableData (arr = []) {
    return arr.map(item => processTabelItem(item));
}

export {
    columns,
}