import React, {
    createRef,
} from 'react';

import ReactDOMServer from 'react-dom/server';

import { useStaticRendering } from 'mobx-react-lite';

import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';

import { 
    StoreProvider, 
    Store, 
    dehydrate 
} from '../../../app/store';

import App from '../../../app/App';

import { debug }  from '../../../app/utils';

useStaticRendering(true);

const ssrRenderer = async (req, res) => {
    debug(`\n\nSSR renderer: rendering url "${req.originalUrl}"`)
    let appRef = createRef(null);

    const context = {};
    const helmetContext = {};
    
    const store = new Store(); 

    debug('SSR renderer: calling store bootstrap!');
    await store.bootstrap();

    debug('SSR renderer: received query params: ', req.query);
    store.setQueryParams(req.query)

    const component = (
        <StoreProvider store={store}>
            <HelmetProvider context={helmetContext}>
                <StaticRouter
                    location={req.originalUrl}
                    context={context}
                >
                    <App 
                        ssr={true}
                        ref={appRef}    
                    />
                </StaticRouter>
            </HelmetProvider>
        </StoreProvider>
    );


    // render once to trigger router & content data load, then await 
    // data load promise exposed by the <App> ref & re-render with loaded data.

    let app = '';
    ReactDOMServer.renderToString(component);
    if (appRef.current && appRef.current.contentPromise) {
        debug('SSR Renderer: waiting for content promise!');
        await appRef.current.contentPromise;

        debug('SSR Renderer: content promise resolved!');
        app = ReactDOMServer.renderToString(component);
    }

    store.setServerSideBootstrapped(true);

    const html = `
        <div id="root">${app}</div>
        <script>
            window.__FROJD_STATE = '${dehydrate(store)}';
        </script>
    `;

    if (context.url) {
        debug('SSR renderer: 301 redirect triggered by react-router!');
        debug(`SSR renderer: redirecting to "${context.url}"`);

        res.writeHead(301, { Location: context.url });
        res.end();
    } else {
        debug('SSR renderer: responding with rendered html!');
        res.send(html);
    }
};

export default ssrRenderer;