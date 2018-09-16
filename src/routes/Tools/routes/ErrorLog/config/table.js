
import React from 'react';
import * as WIDTHS from 'jscom/config/constants/table';

const tableColumns = [
    {
        label: 'IP/Time',
        key: 'ipTime',
        width: WIDTHS.ACCOUNT_ID_WIDTH + 10,
        resize: true,
        fixed: true,
        cellClassName: 's-errorlog__cell'
    },
    {
        label: 'File',
        key: 'file',
        width: WIDTHS.ACCOUNT_NAME_WIDTH,
        resize: true,
        fixed: true,
        cellClassName: 's-errorlog__cell s-errorlog__cell--breakall'
    },
    {
        label: 'MSG',
        key: 'msg',
        width: WIDTHS.CELL_WIDTH * 5,
        resize: true,
        cellClassName: 's-errorlog__cell',
        cellRender: ({ rowData }) => <div className="s-errorlog__cell"><textarea value={rowData.msg} readOnly /></div>  // eslint-disable-line react/prop-types
    },
    {
        label: 'UserAgent',
        key: 'userAgent',
        width: WIDTHS.CELL_WIDTH * 2,
        resize: true,
        cellClassName: 's-errorlog__cell'
    },
];

export function processTableArr (arr = []) {
    return arr.map((item) => {
        return {
            ...item,
            ipTime: <div>{item.ip}<br />{item.createTime}</div>
        }
    });
}

export default tableColumns;
