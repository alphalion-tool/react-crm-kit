'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import shallowEqual from 'shallowequal';
import { Table } from 'antd';
import Container from 'jscom/components/app/Container';
import { getComponentSize } from 'jscom/utils/dom';
import { containerInject } from 'jscom/utils/decorators';
import tableColumns, { processTableArr } from '../config/table';
import services from 'jscom/services';
import './ErrorLog.scss';

export default @containerInject
class ErrorLog extends Component {

    constructor(props) {
        super(props);
        const pagination = {
            current: 1,
            pageSize: 50,
            onChange: this.handlePageChange,
            onSizeChange: this.handleSizeChange,
            total: 0
        };
        this.state = {
            dataList: [],
            // dataList: new DataListStore([]),
            tableWidth: 1000,
            tableHeight: 500,
            pagination,
            status: ''
        };

    }

    componentDidMount() {
        this.resizeComponent();
        this.handleSearch();
    }

    resizeComponent() {
        const size = getComponentSize(this.refBody);
        if (this.refBody && size.width) {
            this.setState({
                tableWidth: size.width - 40,
                tableHeight: size.height - 20,
            });
        }
    }

    @bind
    refBodySet(r) {
        this.refBody = r;
    }

    rowHeightGetter() {
        return 280;
    }

    // 页面大小改变
    @bind
    handleSizeChange(pageSize: number) {
        this.setState({
            pagination: {
                ...this.state.pagination,
                pageSize,
                current: 1,
            }
        }, () => {
            this.handleSearch();
        })
    }

    // 页数改变
    @bind
    handlePageChange(current: number) {
        this.setState({
            pagination: {
                ...this.state.pagination,
                current
            }
        }, () => {
            this.handleSearch();
        });
    }

    handleSearch() {
        const { pagination } = this.state;
        const params = {
            page: pagination.current,
            size: pagination.pageSize
        };

        this.setState({
            status: 'loading'
        })

        services.javascriptQuery(params).then((res) => {
            const result = res.data.data;
            this.setState({
                pagination: {
                    ...pagination,
                    total: result.count
                },
                status: 'done',
                // dataList: new DataListStore(processTableArr(result.data))
            })
        })
    }


    renderTable() {
        const { dataList, tableWidth, tableHeight, pagination, status } = this.state;
        return (
            <Table
                showTotal
                dataColumns={tableColumns}
                dataList={dataList}
                dataWidth={tableWidth}
                dataHeight={tableHeight}
                loading={status === 'loading'}
                toolbar={<div>Search Results:</div>}
                pagination={pagination}
                rowHeightGetter={this.rowHeightGetter}
                showNoData
            />
        );
    }

    render() {
        return (
            <Container>
                <Container.Body innerRef={this.refBodySet}>
                    <div>test</div>
                    <div className="s-content__body__table">
                        {this.renderTable()}
                    </div>
                </Container.Body>
            </Container>
        );
    }
}

