import React from 'react';

import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet-async';

import RawHtml from '../../components/RawHtml';

const Post = observer(({ pageData }) => {
    const { title, content, featuredImage } = pageData;

   return  (
        <>
            <Helmet>
                <title>Post</title>
            </Helmet>
            <div>
                <h1>A poooost: {title}</h1>
                
                {featuredImage &&
                    <img src={featuredImage.sizes.thumbnail.url} />
                }

                <RawHtml html={content} />
            </div>
        </>
   );
});

export default Post;
