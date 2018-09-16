
import { Server } from 'mock-socket';
import DataCenter, { url } from '../communication';

describe('utils communication', () => {

    let wsServer;

    beforeEach(() => {
        wsServer = new Server(url);
    })

    afterEach(() => {
        wsServer.close();
    })

    it('test server send and client get', (done) => {
        wsServer.on('connection', (server, socket) => {
            setTimeout(() => {
                wsServer.send('{"code":0,"type":"trade","data":{"time":1522760633524,"data":[]}}');
            }, 100);
        });

        const cbSpy = jasmine.createSpy('cbSpy');
        DataCenter.close(); //  need fix this
        DataCenter.addListener('trade', cbSpy, 10);
        DataCenter.send(JSON.stringify({
            type: 'trade',
            action: 'query',
            data: { time: +new Date() },
        }));

        setTimeout(() => {
            expect(cbSpy).toHaveBeenCalled();
            expect(cbSpy).toHaveBeenCalledWith({ code: 0, type: 'trade', data: { time: 1522760633524, data: [] } });
            done();
        }, 1000);
    });
});