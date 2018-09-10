
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import Container from 'jscom/components/app/Container';
import { containerInject, connectPermission } from 'jscom/utils/decorators';
import { Table } from 'antd';
import * as windows from 'jscom/utils/window';
import { getComponentSize } from 'jscom/utils/dom';
import DepositListQuery, { getInitialQuery } from '../components/DepositListQuery';
import { columns as COLUMNS } from '../config/table';
import Actions from '../modules/action';

export function mapState2Props (store, ownProps) {

    const { status, depositList } = store.depositList || {};

    return {
        status,
        depositList
    };
}

export class PureDepositList extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        status: PropTypes.string.isRequired,
        depositList: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: '',
            tableWidth: 400,
            tableHeight: 300,
            hasFetched: false,
            querys: getInitialQuery()
        };
    }

    componentDidMount () {
        this.resizeComponent();
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

    refBodySet = (r) => {
        this.refBody = r;
    }

    @bind
    handleSearch () {
        this.props.dispatch(Actions.search(this.state.querys.toJS()));
        this.setState({
            hasFetched: true
        })
    }

    handleClear = () => {
        this.setState({
            querys: getInitialQuery()
        })
    }

    handleQueryChange = (querys) => {
        this.setState({
            querys
        })
    }

    renderTable = () => {
        const { tableList, tableWidth, tableHeight, hasFetched, tableTools } = this.state;
        const { status, depositList } = this.props;

        const rowSelection = {
          getCheckboxProps: record => ({
            accountName: record.accountName
          })
        };

        return (
            <Table
                rowSelection={rowSelection}
                dataSource={depositList}
                columns={COLUMNS}
            />
        );
    }

    render() {
        return (
            <Container>
                <Container.Nav>
                    <DepositListQuery
                        querys={this.state && this.state.querys}
                        onSearch={this.handleSearch}
                        onReset={this.handleClear}
                        onChange={this.handleQueryChange}
                    />
                </Container.Nav>
                <Container.Body innerRef={this.refBodySet}>
                    <div className="s-content__body__table">
                        {this.renderTable()}
                    </div>
                </Container.Body>
            </Container>
        );
    }
}

export default connect(mapState2Props)(connectPermission()(containerInject(PureDepositList)));
