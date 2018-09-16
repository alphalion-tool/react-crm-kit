
// 本地存储，localstorage

const LocalStore = {
    setItem: function (name, value) {
        this.data = this.data || {};
        const cache = localStorage || this.data;
        cache[name] = value;
    },

    getItem: function (name) {
        this.data = this.data || {};
        const cache = localStorage || this.data;
        return cache[name];
    },

    removeItem: function (name) {
        this.data = this.data || {};
        const cache = localStorage || this.data;
        delete cache[name];
    }

};


function setRedirectUrl (url) {
    const redirectUrl = LocalStore.getItem('redirectUrl');
    if (!redirectUrl || redirectUrl.startsWith('/auth')) {
        LocalStore.setItem('redirectUrl', url);
    }
}

function getRedirectUrl (removeFlag) {
    const redirectUrl = LocalStore.getItem('redirectUrl') || '/';
    if (removeFlag) LocalStore.removeItem('redirectUrl');
    return redirectUrl;
}

LocalStore.setRedirectUrl = setRedirectUrl;
LocalStore.getRedirectUrl = getRedirectUrl;

export {
    LocalStore as default,
    setRedirectUrl,
    getRedirectUrl
}