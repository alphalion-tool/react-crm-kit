
import { 
    logger
} from '../logger';

describe('utils logger', () => {

    var oldDev = window.__DEV__;

    afterEach(() => {
        window.__DEV__ = oldDev;
    })

    it('dev=true logger', () => {
        window.__DEV__ = true;
        const x = logger();
        expect(typeof x.debug).toEqual('function');
        expect(typeof x.error).toEqual('function');
        expect(typeof x.info).toEqual('function');
        expect(typeof x.trace).toEqual('function');
        expect(typeof x.log).toEqual('function');
    });

    it('dev=false logger', () => {
        window.__DEV__ = false;
        const x = logger();
        expect(typeof x.debug).toEqual('function');
        expect(typeof x.error).toEqual('function');
        expect(typeof x.info).toEqual('function');
        expect(typeof x.trace).toEqual('function');
        expect(typeof x.log).toEqual('function');
    });



});