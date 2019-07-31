import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './store';

import App from './App';

import { 
    definedNotNull, 
    debug 
} from './utils';

const element = document.getElementById('root');

const app = (
    <StoreProvider>
        <HelmetProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </StoreProvider>

);

if (process.env.BABEL_ENV === 'client'
    && definedNotNull(window.__FROJD_STATE)) 
{
    debug('Client Renderer: hydrating app!')
    ReactDOM.hydrate(app, element);
} else {
    debug('Client Renderer: rendering app!')
    ReactDOM.render(app, element);
}
if (module.hot) {
    module.hot.accept();
}
