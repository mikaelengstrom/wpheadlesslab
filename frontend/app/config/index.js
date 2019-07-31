import { debug } from '../utils';

const generalConfig = {
    cacheTtl: 30 * 1000
}

const devDefaultConfig = {
    wpHome: 'http://repress.dev.test:8880',
    appBase: process.env.BABEL_ENV === 'server'
        && process.env.NODE_ENV === 'development'
        ? 'http://web'
        : 'http://repress.dev.test:8880',
};

const wpInjectedConfig = process.env.BABEL_ENV === 'client' 
    && window && window.__FROJD_SETTINGS
        ? window.__FROJD_SETTINGS
        : {};

const config = {
    ...generalConfig, 
    ...devDefaultConfig,
    ...wpInjectedConfig
};

debug('Loaded config: ', config);

export default config; 