
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import Container from 'jscom/components/app/Container';
import { containerInject, connectPermission } from 'jscom/utils/decorators';
import { Table } from 'antd';
import * as windows from 'jscom/utils/window';
import { getComponentSize } from 'jscom/utils/dom';
import AccountListQuery from '../components/AccountListQuery';
import { columns as COLUMNS } from '../config/table';
import Actions from '../modules/action';

export function mapState2Props (store) {
    const { status, accountList } = store.accountList || {};
    return {
        status,
        accountList
    };
}

export class PureAccountList extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        status: PropTypes.string.isRequired,
        accountList: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: '',
            tableWidth: 400,
            tableHeight: 300,
            hasFetched: false,
        };
    }

    refBodySet = (r) => {
        this.refBody = r;
    }

    @bind
    handleSearch (params) {
        this.props.dispatch(Actions.search(params));
        this.setState({
            hasFetched: true
        })
    }

    @bind
    handleCellClick ({ definition, rowData }) {
        this.logger.log(definition, rowData);
        switch (definition.key) {
            case 'userName':
            case 'userId':
                windows.openUserInfo(rowData.userId);
                break;
            case 'companyName':
                windows.openCompanyInfo(rowData.companyId);
                break;
            default:
                break;
        }
    }

    @bind
    handleNewClick () {
        windows.openCreatePage('user');
    }

    renderTable = () => {
        const { hasFetched } = this.state;
        const { status, accountList } = this.props;
        return (
            <Table
                dataSource={accountList}
                columns={COLUMNS}
                size="small"
                scroll={{ x: true }}
            />
        );
    }

    render() {
        return (
            <Container>
                <Container.Nav>
                    <AccountListQuery onSearch={this.handleSearch} />
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

export default connect(mapState2Props)(connectPermission()(containerInject(PureAccountList)));
