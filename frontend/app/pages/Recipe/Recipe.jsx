import React from 'react';

import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet-async';

import Blocks from '../../layout/Blocks';
import RawHtml from '../../components/RawHtml';

import * as cms from '../../services/cms';

const Recipe = observer(({ id, url, pageData, initialProps }) => {
    const { title, content, featuredImage, recipeScore, blocks } = pageData; 
    const { date } = initialProps; 

    return (
        <>
            <Helmet>
                <title>Recipe Page</title>
            </Helmet>
            <div>
                <h1>Recept: {title}</h1>
                <h3>date initial prop: {date}</h3>
                <h4>Score: {recipeScore ? recipeScore : 'saknas'}</h4>

                {featuredImage &&
                    <img src={featuredImage.sizes.thumbnail.url} />
                }
                
                <p>id: {id}</p>
                <p>url: {url}</p>

                <RawHtml html={content} />

                {blocks && 
                    <Blocks items={blocks} />                
                }
            </div>
        </>
    );
});

Recipe.getInitialProps = async () => {
    const resp = await cms.getDate(); 

    return {
        date: resp.data['date']
    }
};

export default Recipe;