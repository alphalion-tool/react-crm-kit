/* eslint-disable import/prefer-default-export */

import timePromise from 'jscom/utils/timeoutPromise';

export function timeoutPromise (ts = 50) {
    return timePromise(ts);
}
