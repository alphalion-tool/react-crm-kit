import React from 'react';

import { mount } from 'jstest/helpers/enzyme';
import FormPanel from '../FormPanel';

describe('<FormPanel />', () => {

    let wrapper,
        props;

    beforeEach(() => {
        props = {
            className: 'xxx-xxx',
        };
        wrapper = mount(
            <FormPanel {...props}>
                <FormPanel.Content>
                    <FormPanel.Content.Col>
                        xxxx
                        <FormPanel.P>p</FormPanel.P>
                        <FormPanel.P />
                    </FormPanel.Content.Col>
                </FormPanel.Content>
                <FormPanel.Control>
                    yyyy
                </FormPanel.Control>
            </FormPanel>
        );
    });

    it('render success', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('FormPanelContent').exists()).toEqual(true);
        expect(wrapper.find('FormPanelControl').exists()).toEqual(true);
        expect(wrapper.text()).toEqual('xxxxpyyyy');
        expect(wrapper.html()).toEqual('<div class="s-formpanel s-formpanel--editable xxx-xxx"><div class="s-formpanel__content"><div class="s-formpanel__contentcol">xxxx<div>p</div><div></div></div></div><div class="s-formpanel__control">yyyy</div></div>');
    });

    it('reset props', () => {
        wrapper.setProps({
            className: '',
            editable: true,
        })
        wrapper.update();
        expect(wrapper.html()).toEqual('<div class="s-formpanel"><div class="s-formpanel__content"><div class="s-formpanel__contentcol">xxxx<div>p</div><div></div></div></div><div class="s-formpanel__control">yyyy</div></div>');
    });

})