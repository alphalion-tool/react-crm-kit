
import NetworkError, { errorMsgWithData, errorMsgWithCode5 } from '../NetworkError';

describe('services/NetworkError', () => {

    it('errorMsgWithData', () => {
        expect(errorMsgWithData({ v: 'vvv', k: 'kkk' })).toEqual('kkk[vvv]');
        expect(errorMsgWithData({ k: 'kkk', v: [{ k: 'kk1', v: 'vv1' }, { k: 'kk2', v: 'vv2' }] })).toEqual('kkk[kk1[vv1],kk2[vv2]]');
        expect(errorMsgWithData({ k: 'kkk', v: { k: 'kk2', v: 'vv2' } })).toEqual('kkk[kk2[vv2]]');
    });

    it('errorMsgWithCode5', () => {
        expect(errorMsgWithCode5({ params: ['k1', 'k2'] })).toEqual('k1,k2');
        expect(errorMsgWithCode5([{ params: ['k1', 'k2'] }])).toEqual('k1,k2');
        expect(errorMsgWithCode5(['k1', 'k2'])).toEqual('k1,k2');
    });

    it('NetworkError class - create with error', () => {
        const error = NetworkError.createFromError(new Error('this is error'));
        expect(error.name).toEqual('Error');
        expect(error.message).toEqual('this is error');
        expect(error.response).toEqual({});
    });

    it('NetworkError class - create with unknown response', () => {
        const res = {
            config: { url: '/xx', method: 'get' },
            status: 200,
            data: {
                code: -1,
                msg: 'fake error',
                data: null
            },
        };
        const error = new NetworkError(res);
        expect(error.name).toEqual('Unknown Error');
        expect(error.message).toEqual('Unknown Error, this is not defined in the Client, Response status 200 when get /xx');
        expect(error.response).toEqual(res);
    });

    it('NetworkError class - create with known response', () => {
        const res = {
            config: { url: '/xx', method: 'get' },
            status: 200,
            data: {
                code: 100001,
                msg: 'fake error',
                data: null
            },
        };
        const error = new NetworkError(res);
        expect(error.name).toEqual('Not Login');
        expect(error.message).toEqual('Login status has expired');
        expect(error.response).toEqual(res);
    });

})