import React from 'react';

import { toJS } from 'mobx';
import jsonStringifySafe from 'json-stringify-safe';
import * as base64 from 'base64util';

import { 
    definedNotNull,
    debug
} from '../utils';

import Store from './Store';


let defaultStore = new Store(); 
const storeContext = React.createContext();


const StoreProvider = ({ store, children }) => {
    const __store = definedNotNull(store)
        ? store 
        : defaultStore; 

    return (
        <storeContext.Provider value={__store}>
            {children}
        </storeContext.Provider>
    );
}

const MockStoreProvider = ({ store, children }) => {
    return (
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    );
}


const dehydrate = (store) => {
    return base64.encode(jsonStringifySafe(toJS(store, true)));
};

const rehydrate = (storeJson) => {
    return JSON.parse(base64.decode(storeJson));
}


const useStore = () => {
    const store = React.useContext(storeContext);

    if (!store) {
        throw new Error('You\'ve forgotten to use <StoreProvider/>, well shame on you...');
    }

    return store;
}


if (process.env.BABEL_ENV === 'client' // hydrate ssr 
    && definedNotNull(window.__FROJD_STATE)) 
{
    let state = rehydrate(window.__FROJD_STATE);
    defaultStore = new Store(state);

    debug('Hydrated store with state: ', state);
} else if (process.env.BABEL_ENV === 'client') { // ssr failed/not available, start bootstrap
    defaultStore.bootstrap();
}

export {
    Store,
    StoreProvider,
    MockStoreProvider,
    useStore,
    dehydrate, 
    rehydrate
}
