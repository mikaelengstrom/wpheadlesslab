import { 
    debug,
    runningInBrowser,
    runningOnServer,
    isDevEnv
} from '../utils';

const generalConfig = {
    cacheTtl: 5 * 1000
}

const devDefaultConfig = {
    wpHome: 'http://repress.dev.test:8880',
    appBase: runningOnServer() && isDevEnv()
        ? 'http://web'
        : 'http://repress.dev.test:8880',
};

const wpInjectedConfig = runningInBrowser() && window.__FROJD_SETTINGS
    ? window.__FROJD_SETTINGS
    : {};

const config = {
    ...generalConfig, 
    ...devDefaultConfig,
    ...wpInjectedConfig
};

debug('Loaded config: ', config);

export default config; 