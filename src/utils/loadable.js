import React from 'react';
import store from 'jscom/store/store';
import Loading from 'jscom/components/loading/loading';
import rloadable from 'react-loadable';

export default function loadable ({ loading = Loading, loader, render, ...others }) {
    return rloadable({
        ...others,
        loader,
        loading,
        render (loaded, props) {
            return render(loaded, props, store);
        },
    })
}