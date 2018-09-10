/* @flow */

import React, { Component } from 'react';
import { bind } from 'decko';
import QueryBlock from 'jscom/components/query';
import { Button, Input } from 'antd';
import { IMap } from 'jscom/utils/immutable';
import DepositStatusSelect from 'jscom/components/entry/DepositStatusSelect';

type paramType = {
    status?: string,
    accountName?: string,
    accountId?: string,
};

type DepositQueryProps = {
    querys: IMap<paramType>,
    onSearch: () => void,
    onReset: () => void,
    onChange: (params: paramType) => void,
};

export function getInitialQuery() {
    return new IMap({
        status: undefined,
        accountName: undefined,
        accountId: undefined
    });
}

export default class DepositListQuery extends Component {

    props: DepositQueryProps;

    @bind
    handleInputChange (e: SyntheticInputEvent) {
        const { id, value } = e.target;

        this.handleAllChange({
            id,
            value
        })
    }

    handleAllChange = (target: {id: string, value: string}) => {
        const { id, value } = target;

        let newQuerys = {};

        switch (id) {
            case 'status':
                newQuerys = { status: value || /* istanbul ignore next */
                    undefined };
                break;
            case 'accountId':
                newQuerys = { accountId: value || /* istanbul ignore next */
                    undefined };
                break;
            case 'accountName':
                newQuerys = { accountName: value || /* istanbul ignore next */
                    undefined };
                break;
            default:
                break;
        }

        this.props.onChange && this.props.onChange(new IMap({
            ...this.props.querys.toJS(),
            ...newQuerys
        }));
    }

    @bind
    handleSearch () {
        this.props.onSearch && this.props.onSearch();
    }

    handleClear = () => {
        this.props.onReset && this.props.onReset();
    }

    render () {
        const { querys } = this.props;
        return (
            <QueryBlock>
                <QueryBlock.Row>
                    <QueryBlock.Item label="Status">
                        <DepositStatusSelect id="status" placeholder="Select Status" value={querys.get('status')} onChange={this.handleAllChange} />
                    </QueryBlock.Item>
                    <QueryBlock.Item label="Account Name">
                        <Input size="small" id="accountName" placeholder="Type Account Name" value={querys.get('accountName')} onInput={this.handleInputChange} />
                    </QueryBlock.Item>
                    <QueryBlock.Item label="Account Id">
                        <Input size="small" id="accountId" placeholder="Type Account Id" value={querys.get('accountId')} onInput={this.handleInputChange} />
                    </QueryBlock.Item>
                    <QueryBlock.Item label="">
                        <Button size="small" type="primary" onClick={this.handleSearch}>Search</Button>
                        <span>&nbsp;&nbsp;</span>
                        <Button size="small" onClick={this.handleClear}>Reset</Button>
                    </QueryBlock.Item>
                </QueryBlock.Row>
            </QueryBlock>
        );
    }
}