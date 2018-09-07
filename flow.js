import React from 'react';
import Immutable from 'immutable';
import { EventEmitter } from 'fbemitter';

declare var BLog: any;

declare module 'decko' {
    declare export default any;
    declare export var bind: () => {};
    declare export var memoize: () => {};
    declare export var debounce: () => {};
}

declare module 'react-style-proptype' {
    declare export default any;
}
declare module 'prop-types' {
    declare export default any;
}

declare module 'shallowequal' {
    declare export default any;
}

declare module 'jscom/utils/immutable' {
    declare export default any;
    declare export var IList: Immutable.List;
    declare export var IMap: Immutable.IMap;
    declare export var ISet: Immutable.ISet;
}

declare module 'react-scroll' {
    declare export default any;
    declare export var Link: React.Component;
    declare export var Element: React.Component;
    declare export var Events: any;
    declare export var scrollSpy: any;
    declare export var animateScroll: any;
}

declare module 'fbemitter' {
    declare export default any;
    declare export var EventEmitter: typeof EventEmitter;
}

declare module 'lodash.clonedeep' {
    declare export default any;
}

declare module 'lodash.times' {
    declare export default any;
}
declare module 'query-string' {
    declare export default any;
}
declare module 'hoist-non-react-statics' {
    declare export default any;
}