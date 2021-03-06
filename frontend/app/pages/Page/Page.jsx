import React from 'react';

import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet-async';

import RawHtml from '../../components/RawHtml';

import { useForceSsrLoad } from '../../hooks';

const Page = observer(({ pageData }) => {
    const { title, content, featuredImage } = pageData; 

    const willReload = useForceSsrLoad();
    if (willReload) {
        return null;
    }

    return (
        <>
            <Helmet>
                <title>Page</title>
            </Helmet>
            <div>
                <h1>A page: {title}</h1>
                {featuredImage &&
                    <img src={featuredImage.sizes.thumbnail.url} />
                }
                
                <RawHtml html={content} />
            </div>

        </>
    );
}); 

export default Page;
