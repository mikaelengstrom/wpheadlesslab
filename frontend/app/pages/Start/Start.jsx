import React from 'react';
import { observer } from 'mobx-react-lite';

import { Helmet } from 'react-helmet-async';
import RawHtml from '../../components/RawHtml';

import {getDate as getServerSideDate} from '../../services/cms';

const Start = observer(({ pageData, initialProps }) => {
    const { date } = initialProps;
    const { title, content, featuredImage } = pageData; 
    
    return (
        <>
            <Helmet>
                <title>Start Page</title>
            </Helmet>
            <div>
                <h1>Start page: {title}</h1>
                {featuredImage &&
                    <img src={featuredImage.sizes.thumbnail.url} />
                }

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
