

export function locationCreator ({ pathname = '/', ...props }) {
    return {
        pathname,
        key: props.key || null,
        hash: props.hash || null,
        query: props.query || {},
        search: props.search || '',
        action: props.action || 'POP',
    };
}

export function createRouter (location, params) {
    return {
        go: () => {},
        goBack: () => {},
        goForward: () => {},
        push: () => {},
        replace: () => {},
        transitionTo: () => {},
        listen: () => {},
        listenBefore: () => {},
        getCurrentLocation: () => '',
        isActive: () => {},
        location,
        params
    };
}


export default function mockRouter (location = {}, params = {}) {
    const newLocation = locationCreator(location);
    const router = createRouter(newLocation, params);
    return {
        location: newLocation,
        router,
        params
    }
}