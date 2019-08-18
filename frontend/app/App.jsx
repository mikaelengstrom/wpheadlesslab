import React from 'react';

import { 
    Switch, 
    Route, 
    withRouter,
} from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useStore } from './store';

import { 
    usePrevious, 
} from './hooks';

import Header from './layout/Header';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

import Start from './pages/Start';
import Page from './pages/Page';
import Post from './pages/Post';
import Recipe from './pages/Recipe';
import RecipeList from './pages/RecipeList';
import RecipeCategoryListing from './pages/RecipeCategoryListing';

import { defined, debug } from './utils';

const pageComponents = {
    'Start': Start, 
    'Page': Page, 
    'Post': Post, 
    'Recipe': Recipe,
    'RecipeList': RecipeList,
    'RecipeCategoryListing': RecipeCategoryListing
};

const updateWpAdminBarEditButtonWithId = (pageId) => {
    const wrapEl = document.getElementById('wp-admin-bar-edit');
    if(!wrapEl) {
        return; 
    }

    const linkEl = wrapEl.getElementsByTagName('a')[0];
    const editUrl = linkEl.href;

    const editRegex = /(.*)(post=)(\d+)(.*)/;
    if (editUrl.match(editRegex)) {
        const updatedEditUrl = editUrl.replace(editRegex, `$1$2${pageId}$4`);
        linkEl.href = updatedEditUrl;
        debug('App> updateWpAdminBarEditButtonWithId() - updating edit button id to: ', pageId);
    }
}

const LocationSwitch = withRouter((props) => {
    const store = useStore();

    const { children } = props; 
    const prevProps = usePrevious(props);

    // check whether user has navigated or whether this is the initial load without a hydrated store 
    // if yes, set location to changed in order to trigger page data & initial props load 
    // for route (see renderRoute()) 

    if ((prevProps && prevProps.location.pathname !== props.location.pathname) 
        || (!prevProps && !store.serverSideBootstrapped)) 
    {
        debug('LocationSwitch> setting location changed state to: ', true);

        store.setLocationChanged(true);
    } else {
        debug('LocationSwitch> setting location changed state to: ', false);
        debug('LocationSwitch> was ssr bootstrapped: ', store.serverSideBootstrapped);

        store.setLocationChanged(false);
    }

    return (
        <Switch>
            {children}
        </Switch>
    ); 
}); 

const App = observer(({ ssr = false }, ref) => {
    let store = useStore();

    // trigger a rerender when these props are changed
    store.loadingPageAndProps;
    store.pageData;
    store.pageInitialProps;

    if(store.state === store.states.loading) {
        return (
            <div>Loading...</div>
        );
    }

    if (store.state === store.states.error) {
        return (
            <div>
                <h3>An error occured:</h3> 
                <code>{store.getError()}</code>
            </div>
        );
    }

    const renderRoute = (props, route) => {
        debug('App> renderRoute() called');
        debug('App> has location changed?', store.locationChanged);

        let PageComponent = pageComponents[route.component];

        if(!defined(PageComponent)) {
            const message = `Could not render page - no React component mapped to name "${route.component}" found!`; 
            console.error(`App> Could not render page - no React component mapped to name "${route.component}" found!`);

            PageComponent = () => (
                <Error 
                    code="501"
                    message={message} 
                />
            );
        }

        // expose promises in ref (enables us to wait for 
        // data load when doing ssr, see server/lib/ssr/index.js).

        if(ref && defined(ref.current) && ref.current === null) { // ssr
            debug('App> renderRoute is triggering SSR data & props load procedure - will not render this run'); 

            ref.current = {
                contentPromise: store.loadContentAndInitialProps(
                    route.id, 
                    route.postType, 
                    PageComponent.getInitialProps
                )
            };

            // don't render anything here, just trigger the promise 
            // the ssr renderer will trigger a new render when the promise is resolved

            return null; 
        } else if(!ssr && store.locationChanged) { // client 
            debug('App> renderRoute is triggering CLIENT data & props load procedure'); 

            store.loadContentAndInitialProps(
                route.id, 
                route.postType, 
                PageComponent.getInitialProps
            );

            updateWpAdminBarEditButtonWithId(route.id);
        }

        debug('App> current loaded pageData: ', store.pageData);
        debug('App> passing query params to page component: ', store.currentQuery);

        return (
            <PageComponent
                id={route.id}
                type={route.postType}
                url={route.url}

                loading={store.loadingPageAndProps}
                pageData={store.pageData}
                initialProps={store.pageInitialProps}
                pageQuery={store.currentQuery}

                {...props}
            />
        );
    };

    return (
        <>
            <Header />
            <LocationSwitch ssr={ssr}>
                {store.routes.map(route => (
                    <Route
                        exact
                        key={route.url}
                        path={route.url}
                        render={(props) => renderRoute(props, route)}
                    />
                ))}
                <Route component={NotFound} />
            </LocationSwitch>
        </>
    );

}, { forwardRef: true });

export default App;
