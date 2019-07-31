import React from 'react';

import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404</title>
            </Helmet>

            <div>
                <h1>404</h1>
                <p>The page could not be found</p> 
            </div>
        </>
    );
};

export default NotFound;