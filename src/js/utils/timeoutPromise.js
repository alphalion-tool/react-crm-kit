
function createTimeoutPromise(milliseconds) {
    return new Promise((resolve) => {
        setTimeout( () => {
            resolve();
        }, milliseconds);
    });
}

export const defaultTime = 3000;

export default createTimeoutPromise;