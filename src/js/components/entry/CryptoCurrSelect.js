
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const currencyList = [
    {
        label: 'BTC',
        value: 'btc'
    },
    {
        label: 'BCH',
        value: 'bch'
    },
    {
        label: 'ZEC',
        value: 'zec'
    },
    {
        label: 'LTC',
        value: 'ltc'
    },
    {
        label: 'EOS',
        value: 'eos'
    },
    {
        label: 'XRP',
        value: 'xrp'
    },
    {
        label: 'XLM',
        value: 'xlm'
    }
];

export default class CryptoCurrSelect extends Component {

    render () {
        return (
            <Select style={{ width: 80 }} value={this.props.value} onChange={this.props.onChange} size="small">
                {currencyList.map((item) => <Option value={item.value} key={item.value}>{item.label}</Option>)}
            </Select>
        );
    }

}