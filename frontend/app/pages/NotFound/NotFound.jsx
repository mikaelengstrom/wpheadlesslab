import React from 'react';
// import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

const NotFound = ({ message }) => {
    return (
        <>
            <Helmet>
                <title>404</title>
            </Helmet>

            <div>
                <h1>404</h1>
                <p>{message}</p> 
            </div>
        </>
    );
};

NotFound.defaultProps = {
    message: 'The page could not be found'
};


export default NotFound;