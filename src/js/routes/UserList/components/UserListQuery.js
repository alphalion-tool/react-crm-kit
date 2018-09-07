/* @flow */

import React, { Component } from 'react';
import { bind } from 'decko';
import QueryBlock from 'jscom/components/query';
import { Button, Input } from 'antd';
import { IMap } from 'jscom/utils/immutable';

type paramType = {
    name?: string,
};

type UserQueryProps = {
    onSearch: (params: paramType) => void,
};

type UserQueryState = {
    querys: IMap<paramType>,
};

export default class UserListQuery extends Component {

    props: UserQueryProps;

    state: UserQueryState = {
        querys: new IMap({}),
    };

    @bind
    handleInputChange (e: SyntheticInputEvent, id?: string) {
        this.setState({
            querys: this.state.querys.set(id, e.target.value)
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
        const { onSearch, ...otherProps } = this.props;
        return (
            <QueryBlock>
                <QueryBlock.Row>
                    <QueryBlock.Item label="User Name">
                        <Input size="small" id="name" placeholder="Type User Name" value={this.state.querys.get('name')} onChange={this.handleInputChange} />
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