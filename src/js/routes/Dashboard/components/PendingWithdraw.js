
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { withdrawColumns } from '../config/table';

export default class PendingWithdraw extends PureComponent {

    static propTypes = {
        withdrawList: PropTypes.array.isRequired
    };

    render () {
        return (
            <div style={{ height: 400, paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                <Table columns={withdrawColumns} dataSource={this.props.withdrawList} size="small" pagination={false} scroll={{ y: 300 }} />
            </div>
        );
    }
}