
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import Container from 'jscom/components/app/Container';
import { containerInject, connectPermission } from 'jscom/utils/decorators';
import { Table, Message } from 'antd';
import * as windows from 'jscom/utils/window';
import { getComponentSize } from 'jscom/utils/dom';
import UserListQuery from '../components/UserListQuery';
import { columns as COLUMNS, getTableToolConfig } from '../config/table';
import Actions from '../modules/action';

export function mapState2Props (store, ownProps) {

    const { status, userList } = store.userList || {};

    return {
        status,
        userList
    };
}

export class PureUserList extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        status: PropTypes.string.isRequired,
        userList: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        const tableTools = getTableToolConfig(props);
        if (tableTools.find(item => item.name === 'add')) {
            tableTools.find(item => item.name === 'add').onClick = this.handleNewClick;
        }
        this.state = {
            status: '',
            tableWidth: 400,
            tableHeight: 300,
            hasFetched: false,
            tableTools
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
            default:
                break;
        }
    }

    @bind
    handleNewClick () {
        windows.openCreatePage('user');
    }

    renderTable = () => {
        const { status, userList } = this.props;
        return (
            <Table
                dataSource={userList}
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
                    <UserListQuery onSearch={this.handleSearch} />
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

export default connect(mapState2Props)(connectPermission()(containerInject(PureUserList)));
