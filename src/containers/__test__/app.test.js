
import React, { PureComponent } from 'react';
import { shallow, mount } from 'jstest/helpers/enzyme';
import mockRouter from 'jstest/helpers/router';
import App from '../App';

const PureApp = App.WrappedComponent;

class DemoChild extends PureComponent {
    render () {
        return <div>test</div>;
    }
}

describe('App Container', () => {

    it('render success', () => {
        const store = window.__TEST__.STORE;
        const wrapper = shallow(<App store={store} {...mockRouter()} />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('render children success', () => {
        const store = window.__TEST__.STORE;
        const wrapper = shallow(<App store={store} {...mockRouter()}><DemoChild /></App>);
        expect(wrapper.find(DemoChild).exists()).toEqual(true);
    });
})