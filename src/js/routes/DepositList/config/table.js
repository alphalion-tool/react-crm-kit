import React, { Component } from 'react';
import { Tag } from 'antd';
import * as WIDTHS from 'jscom/config/constants/table';
import { dateFormatChange } from 'jscom/utils/time';

const columns = [
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        width: WIDTHS.CELL_WIDTH,
        render: (item) => {
            return (
                <Tag color={item.color} key={item.lable}>{item.lable}</Tag>
            )
        }
    },
    {
        title: 'ACC Id',
        key: 'accountId',
        dataIndex: 'accountId',
        width: WIDTHS.CELL_WIDTH,
    },
    {
        title: 'ACC Name',
        key: 'accountName',
        dataIndex: 'accountName',
    },
    {
        title: 'Quantity',
        key: 'quantity',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
    },
    {
        title: 'Currency',
        key: 'currency',
        dataIndex: 'currency'
    },
    {
        title: 'Create Time',
        key: 'ctime',
        dataIndex: 'ctime',
        width: WIDTHS.CELL_WIDTH,
    },
    {
        title: 'Create By',
        key: 'createBy',
        dataIndex: 'createBy',
        width: WIDTHS.CELL_WIDTH,
    }
];

function getStatusColor (status) {
    let result = '';

    switch (status && status.toLowerCase()) {
        case 'active':
            result = '#52c41a';
            break;
        case 'pending':
            result = '#1890ff';
            break;
        default:
            break;
    }

    return result;
}

export function processTabelItem (item) {
    return {
        ...item,
        key: item.id,
        status: {
            lable: item.status,
            color: getStatusColor(item.status),
        },
        ctime: dateFormatChange(item.ctime, 'YYYY-MM-DD HH:mm:ss', 'MM/DD/YYYY HH:mm:ss'),
    };
}

export function processTableData (arr = []) {
    return arr.map(item => processTabelItem(item));
}

export {
    columns,
}