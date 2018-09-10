
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const depositsList = [
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Pending',
        value: 'pending'
    },
    {
        label: 'Finish',
        value: 'finish'
    }
];

type DepositStatusSelectProps = {
    id?: string,
    value?: string,
    placeholder?: string,
    onChange?: (value?: '', id?: string) => void,
};

export default class DepositStatusSelect extends Component {

    props: DepositStatusSelectProps

    handleSelectChange = (value) => {
        this.props.onChange && this.props.onChange({
            id: this.props.id,
            value: value,
        })
    }

    render () {
        return (
            <Select
                style={{ width: 125 }}
                value={this.props.value}
                onChange={this.handleSelectChange}
                size="small"
                placeholder={this.props.placeholder || 'Select Status'}
            >
                {depositsList.map((item) => <Option value={item.value} key={item.value}>{item.label}</Option>)}
            </Select>
        );
    }

}