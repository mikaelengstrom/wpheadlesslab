import React from 'react';
// import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

const Error = ({ code = '500', message }) => {
    return (
        <>
            <Helmet>
                <title>Error {code}</title>
            </Helmet>

            <div>
                <h1>Error - {code}</h1>
                <p>{message}</p> 
            </div>
        </>
    );
};

Error.defaultProps = {
    message: 'The page could not be found'
};


export default Error;