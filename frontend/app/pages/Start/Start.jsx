import React from 'react';
import { observer } from 'mobx-react-lite';

import { Helmet } from 'react-helmet-async';
import RawHtml from '../../components/RawHtml';

import { useForceSsrLoad } from '../../hooks';

import {getDate as getServerSideDate} from '../../services/cms';

const Start = observer(({ pageData, initialProps }) => {
    const willReload = useForceSsrLoad(); 
    if(willReload) {
        return null; 
    }

    const { date } = initialProps;
    const { title, content } = pageData; 
    
    return (
        <>
            <Helmet>
                <title>Start Page</title>
            </Helmet>
            <div>
                <h1>Start page: {title}</h1>
                <p>date initial prop: {date}</p>

                <RawHtml html={content} />                
            </div>
        </>
    );
});

Start.getInitialProps = async () => {
    let resp = await getServerSideDate(); 

    return {
        date: resp.data['date']
    }
};

export default Start;
