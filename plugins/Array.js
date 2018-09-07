/* eslint-disable no-extend-native */

Array.prototype.rejectInPlace = function(callback) {
    return this.filterInPlace((...args) => {
        return !callback(...args);
    });
};

Array.prototype.filterInPlace = function(callback) {
    let i = 0,
        j = 0;

    while (i < this.length) {
        const val = this[i];
        if (callback(val, i, this)) this[j++] = val;
        i++;
    }

    this.length = j;
    return this;
};