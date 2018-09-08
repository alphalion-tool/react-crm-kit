
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const pairList = [
    {
        label: 'BTC-USDT',
        value: 'btc-usdt'
    },
    {
        label: 'BCH-USDT',
        value: 'bch-usdt'
    },
    {
        label: 'ZEC-USDT',
        value: 'zec-usdt'
    },
    {
        label: 'LTC-USDT',
        value: 'ltc-usdt'
    },
    {
        label: 'EOS-USDT',
        value: 'eos-usdt'
    },
    {
        label: 'XRP-USDT',
        value: 'xrp-usdt'
    },
    {
        label: 'XLM-USDT',
        value: 'xlm-usdt'
    }
];

export default class CryptoCurrSelect extends Component {

    render () {
        return (
            <Select style={{ width: 130 }} value={this.props.value} onChange={this.props.onChange} size="small">
                {pairList.map((item) => <Option value={item.value} key={item.value}>{item.label}</Option>)}
            </Select>
        );
    }

}