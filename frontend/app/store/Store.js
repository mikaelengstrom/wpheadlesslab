import {
    observable,
    action,
    runInAction,
    set,
    configure as configureStore,
} from 'mobx';

import queryString from 'query-string';

import { 
    defined,
    isFn, 
    isStr,
    isObj,
    runningInBrowser,
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

        runInAction(() => {
            Object.assign(this, initialState || {});
        });

        cache.setTtl(config.cacheTtl);
        this.updateQueryParams(); 
    }

    // main ui state
    @observable state = this.states.loading;
    @observable error = null; 

    // global state
    serverSideBootstrapped = false; 
    locationChanged = false; 
    currentQuery = {};
    wpRestNonce = {};
    isLoggedIn = false; 

    @observable routes = [];
    @observable primaryMenu = {}; 

    // current page state 
    @observable loadingPageAndProps = false; 
    @observable pageData = observable.object({});
    @observable pageInitialProps = observable.object({}); 

    @action 
    async bootstrap() {
        debug('Store: bootstrapping!');

        if (runningInBrowser() && defined(window.__FROJD_SETTINGS)) {
            this.wpRestNonce = window.__FROJD_SETTINGS.wpRestNonce;
            this.isLoggedIn = window.__FROJD_SETTINGS.wpLoggedIn;

            debug('Store: is logged in to WP: ', this.isLoggedIn);
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

    // getters / setters 

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

    hasQueryParams() {
        return Object.keys(this.currentQuery)
            .length > 0; 
    }

    hasPreviewQuery() {
        return this.hasQueryParams() 
            && 'preview' in this.currentQuery 
            && this.currentQuery['preview'] === 'true'; 
    }

    updateQueryParams() {
        if (runningInBrowser()) {
            this.setQueryParams(
                queryString.parse(window.location.search)
            );
        }
    }

    getError() {
        if(isStr(this.error)) {
            return this.error; 
        }

        if(isObj(this.error) && 'stack' in this.error) {
            return this.error.stack; 
        }

        if (isObj(this.error) && 'message' in this.error) {
            return this.error.message; 
        }

        return null; 
    }

    getRouteByComponentName(name) {
        const foundRoutes = this.routes.filter(route => 
            route.component === name
        );

        return foundRoutes.length 
            ? foundRoutes[0].url
            : null; 
    }

    // actions

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
                this.error = error; 
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
                this.error = error; 
            });
        }
    }

    @action
    async loadContentAndInitialProps(id, type, urlParams, getInitialProps) {
        this.updateQueryParams(); 

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

        this.loadingPageAndProps = true; 

        const loadContent = () => this.hasPreviewQuery()
            ? this.loadContentPreview(id, type)
            : this.loadContent(id, type);

        const loadInitialProps = () => isFn(getInitialProps)
            ? this.loadInitialProps(getInitialProps, urlParams)
            : undefined;

        await Promise.all([
            loadContent(), 
            loadInitialProps()
        ]); 

        runInAction(() => {
            this.loadingPageAndProps = false
        }); 
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
                this.error = error; 
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
            runInAction(() => {
                debug('Store: loadContentPreview() FAILED, reason: ', error);

                this.state = this.states.error;
                this.error = error; 
            });
        }
    } 

    @action 
    async loadInitialProps(getInitialProps, urlParams) {
        debug('Store: loadInitialProps() called - loading props!');

        try {
            const props = await getInitialProps({
                urlParams, 
                pageQuery: this.currentQuery
            });

            debug('Store: fetched initial props!');

            runInAction(() => {
                set(this.pageInitialProps, props);
            }); 
        } catch (error) {
            runInAction(() => {
                this.state = this.states.error;
                this.error = error; 
            });
        }
    }
}

export default Store;
