
import React from 'react';
import { shallow, mount } from 'jstest/helpers/enzyme';
import QueryBlock from '../QueryBlock';
import Input from 'antd/lib/input';

import { queryBlockTestCollapseClick } from 'jstest/helpers/utils';

describe('Component QueryBlock', () => {

    let wrapper,
        onCollapseSpy;

    beforeEach(() => {
        onCollapseSpy = jasmine.createSpy('onChange() spy');
        wrapper = mount(
            <QueryBlock>
                <QueryBlock.Row>
                    <QueryBlock.Item label="Name">
                        <Input type="text" size="small" />
                    </QueryBlock.Item>
                </QueryBlock.Row>

                <QueryBlock.Row>
                    <QueryBlock.Item label="Id">
                        <Input type="text" size="small" className="test-input" />
                    </QueryBlock.Item>
                </QueryBlock.Row>
            </QueryBlock>
        );
    })

    it('render success', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('QueryRow').length).toEqual(2);
        expect(wrapper.find('QueryItem').length).toEqual(2);
        expect(wrapper.find('QueryRow').first().find('label').text()).toEqual('Name');
        expect(wrapper.find('QueryRow').last().find('label').text()).toEqual('Id');
        expect(wrapper.find('QueryRow').last().find('input.test-input').length).toEqual(1);
    });

    it('collapse', () => {
        wrapper.setProps({ 
            supportCollapse: true,
            onCollapse: onCollapseSpy, 
            expandLabelText: 'ex',
            collapseLabelText: 'co',
            collapseBlock: 'Collapse Content'
        });

        // 先进行props等校验
        expect(wrapper.find('QueryBlockCollapseBtn').text()).toEqual('co');
        expect(wrapper.find('.c-query__collapse__block').length).toEqual(0);
        expect(wrapper.state('collapseFlag')).toEqual(false);

        // 点击折叠
        queryBlockTestCollapseClick(wrapper);
        expect(onCollapseSpy).toHaveBeenCalled();

        expect(wrapper.find('QueryBlockCollapseBtn').text()).toEqual('ex');
        expect(wrapper.state('collapseFlag')).toEqual(true);
        expect(wrapper.find('.c-query__collapse__block').text()).toEqual('Collapse Content');

        // 再点击展开
        queryBlockTestCollapseClick(wrapper);
        expect(onCollapseSpy).toHaveBeenCalled();

        expect(wrapper.find('.c-query__collapse__block').length).toEqual(0);
        expect(wrapper.state('collapseFlag')).toEqual(false);
    });

})