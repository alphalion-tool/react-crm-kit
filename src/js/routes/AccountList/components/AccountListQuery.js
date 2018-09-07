/* @flow */

import React, { Component } from 'react';
import { bind } from 'decko';
import QueryBlock from 'jscom/components/query';
import { Button, Input } from 'antd';
import { IMap } from 'jscom/utils/immutable';

type paramType = {
    accountName?: string,
    accountId?: string,
};

type AccountQueryProps = {
    onSearch: (params: paramType) => void,
};

type AccountQueryState = {
    querys: IMap<paramType>,
};

export default class AccountListQuery extends Component {

    props: AccountQueryProps;

    state: AccountQueryState = {
        querys: new IMap({}),
    };

    @bind
    handleInputChange (e: SyntheticInputEvent) {
        this.setState({
            querys: this.state.querys.set(e.target.id, e.target.value)
        });
    }

    @bind
    handleSearch (e: SyntheticEvent) {
        this.props.onSearch(this.state.querys.toJS());
    }

    handleClear = () => {
        this.setState({
            querys: new IMap({})
        })
    }
    render () {
        return (
            <QueryBlock>
                <QueryBlock.Row>
                    <QueryBlock.Item label="Account Name">
                        <Input size="small" id="accountName" placeholder="Type Account Name" value={this.state.querys.get('accountName')} onInput={this.handleInputChange} />
                    </QueryBlock.Item>
                    <QueryBlock.Item label="Account Id">
                        <Input size="small" id="accountId" placeholder="Type Account Id" value={this.state.querys.get('accountId')} onInput={this.handleInputChange} />
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