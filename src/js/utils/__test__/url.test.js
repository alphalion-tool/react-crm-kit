
import joinParams from '../url';

describe('utils url', () => {

    it('function test', () => {
        expect(joinParams('/user')).toEqual('/user');
        expect(joinParams('/user', {})).toEqual('/user');
        expect(joinParams('/user', { id: 1 })).toEqual('/user?id=1');
        expect(joinParams('/user', { id: 1, info: 2 })).toEqual('/user?id=1&info=2');
        expect(joinParams('/user?id=1', { info: 2, act: 3 })).toEqual('/user?id=1&act=3&info=2');
    });

});