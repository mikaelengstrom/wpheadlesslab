import {
    observable,
    action,
    runInAction,
    set,
    has,
    configure as configureStore,
} from 'mobx';

import queryString from 'query-string';

import { 
    isFn, 
    debug 
} from '../utils';

import config from '../config';

import * as cms from '../services/cms';
import * as cache from '../services/cache';

class Store {
    debug = true; 

    states = {
        error: 'error',
        loading: 'loading',
        ready: 'ready'
    };

    constructor(initialState) {
        configureStore({
            enforceActions: 'always'
        });

        cache.setTtl(config.cacheTtl);

        runInAction(() => {
            Object.assign(this, initialState || {});

        });

        if(process.env.BABEL_ENV === 'client') {
            this.setQueryParams(queryString.parse(window.location.search));
        }
    }

    // main ui state
    @observable state = this.states.loading;

    // global state
    serverSideBootstrapped = false; 
    locationChanged = false; 
    currentQuery = {};
    wpRestNonce = {};

    @observable routes = [];
    @observable primaryMenu = {}; 
    @observable content = observable.object({}); 

    // current page state 
    @observable pageData = observable.object({});
    @observable pageInitialProps = observable.object({}); 

    @action 
    async bootstrap() {
        debug('Store: bootstrapping!');

        if (process.env.BABEL_ENV === 'client') {
            this.wpRestNonce = window.__FROJD_SETTINGS 
                && window.__FROJD_SETTINGS.wpRestNonce
                    ? window.__FROJD_SETTINGS.wpRestNonce 
                    : 'NONE';

            debug('Store: using injected wp rest nonce: ', this.wpRestNonce);
        }

        await Promise.all([
            this.loadRoutes(),
            this.loadPrimaryMenu()
        ]);

        debug('Store: loaded routes & menus!');

        runInAction(() => {
            this.state = this.states.ready; 
        });
    }

    setLocationChanged(bool) {
        this.locationChanged = bool; 
    } 

    setServerSideBootstrapped(bool) {
        this.serverSideBootstrapped = bool; 
    }

    setQueryParams(params) {
        debug('Store: setting query params to: ', params);
        this.currentQuery = params;
    }

    get hasQueryParams() {
        return Object.keys(this.currentQuery).length > 0; 
    }

    get hasPreviewQuery() {
        return this.hasQueryParams 
            && 'preview' in this.currentQuery 
            && this.currentQuery['preview'] === 'true'; 
    }

    @action
    async loadContentAndInitialProps(id, type, getInitialProps) {

        debug('Store: loadContentAndInitialProps() called - loading content and initial props');
        debug('Store: current query params: ', this.currentQuery);

        // clear page data 
        // (in order to not render incorrect data on new page while new page data is loading)
        this.pageData = observable.object({}); 
        debug('Store: cleared pageData'); 

        // clear initial props
        // (in order to not render incorrect data on new page while new page props are loading)
        this.pageInitialProps = observable.object({}); 
        debug('Store: cleared pageInitialProps'); 

        let loadContent = () => this.hasPreviewQuery
            ? this.loadContentPreview(id, type)
            : this.loadContent(id, type);

        await Promise.all([
            loadContent(), 
            isFn(getInitialProps) 
                ? this.loadInitialProps(getInitialProps)
                : undefined
        ]); 
    }
    
    @action
    async loadContent(id, type) {
        debug('Store: loadContent() called - loading page data '); 

        if(cache.hasKey(id)) {
            set(this.pageData, cache.get(id));
            debug('Store: loadContent() - page data found in cache, returning cached data');
            return;
        }

        try {
            const content = await cms.getContent(id, type);

            runInAction(() => {
                cache.set(id, content);
                set(this.pageData, content);

                debug('Store: set pageData: ', this.pageData);
            });

        } catch (error) {
            runInAction(() => {
                this.state = this.states.error;
            });
        }
    }

    @action
    async loadContentPreview(id, type) {
        const mediaId = '_thumbnail_id' in this.currentQuery
                ? this.currentQuery['_thumbnail_id']
                : -1; 
            
        debug('Store: loadContentPreview() called - loading PREVIEW page data ');
        debug('Store: loadContentPreview() - will load featured media preview with media id: ', mediaId);

        try {
            const content = await cms.getContentPreview(id, type, mediaId, this.wpRestNonce);

            runInAction(() => {
                debug('Store: setting PREVIEW pageData: ', this.pageData);
                set(this.pageData, content);
            });

        } catch (error) {
            debug('Store: loadContentPreview() FAILED, reason: ', error);
            runInAction(() => {
                this.state = this.states.error;
            });
        }
    } 
    @action 
    async loadInitialProps(getInitialProps) {
        debug('Store: loadInitialProps() called - loading props!');

        try {
            const props = await getInitialProps();

            runInAction(() => {
                debug('Store: fetched initial props!');
                set(this.pageInitialProps, props);
            }); 
        } catch (error) {
            runInAction(() => {
                this.state = this.states.error;
                throw error; 
            });
        }
    }

    @action
    async loadRoutes() {
        try {
            const routes = await cms.getRoutes();
            runInAction(() => {
                this.routes = routes;
            });

        } catch (error) {
            runInAction(() => {
                this.state = this.states.error;
                throw error; 
            });
        }
    }

    @action
    async loadPrimaryMenu() {
        try {
            const menu = await cms.getPrimaryMenu();

            runInAction(() => {
                this.primaryMenu = menu;
            });
        } catch (error) {
            runInAction(() => {
                this.state = this.states.error;
                throw error; 
            });
        }
    }
}

export default Store;
