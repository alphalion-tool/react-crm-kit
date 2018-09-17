/* @flow */
/* eslint-disable react/require-optimization */

import React, { Component } from 'react';
import { bind } from 'decko';
import QueryBlock from 'jscom/components/query';
import { Button, Input } from 'antd';
import { IMap } from 'jscom/utils/immutable';
import { intlInject } from 'jscom/utils/decorators';

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

@intlInject
export default class AccountListQuery extends Component {

    props: AccountQueryProps;
    intl: (string) => string;

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

    @bind
    handleClear () {
        this.setState({
            querys: new IMap({})
        })
    }
    render () {
        return (
            <QueryBlock>
                <QueryBlock.Row>
                    <QueryBlock.Item label={this.intl('account.name')}>
                        <Input size="small" id="accountName" placeholder={`${this.intl('account.name.placeholder')}`} value={this.state.querys.get('accountName')} onInput={this.handleInputChange} />
                    </QueryBlock.Item>
                    <QueryBlock.Item label={this.intl('account.id')}>
                        <Input size="small" id="accountId" placeholder={`${this.intl('account.id.placeholder')}`} value={this.state.querys.get('accountId')} onInput={this.handleInputChange} />
                    </QueryBlock.Item>
                    <QueryBlock.Item label="">
                        <Button size="small" type="primary" onClick={this.handleSearch}>{this.intl('common.btn.search')}</Button>
                        <span>&nbsp;&nbsp;</span>
                        <Button size="small" onClick={this.handleClear}>{this.intl('common.btn.reset')}</Button>
                    </QueryBlock.Item>
                </QueryBlock.Row>
            </QueryBlock>
        );
    }

}