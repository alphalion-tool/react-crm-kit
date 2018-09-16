
import { getComponentSize } from '../dom';

import ReactDOM from 'react-dom';

describe('utils dom', () => {
    it('getComponentSize', () => {
        expect(getComponentSize()).toEqual({ width: 0, height: 0 });
        spyOn(ReactDOM, 'findDOMNode').and.returnValue({ offsetWidth: 101, offsetHeight: 104 });
        expect(getComponentSize({})).toEqual({ width: 101, height: 104 });
    });
})