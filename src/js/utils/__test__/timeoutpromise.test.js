

import createTimeoutPromise from '../timeoutPromise';

describe('utils timeoutpromise', () => {

    it('createTimeoutPromise', (done) => {
        const mise = createTimeoutPromise(200);
        let isRun = false;
        mise.then(() => {
            isRun = true;
        })
        setTimeout(() => {
            expect(isRun).toEqual(false);
        }, 100);

        setTimeout(() => {
            expect(isRun).toEqual(true);
            done()
        }, 250);
    })

});