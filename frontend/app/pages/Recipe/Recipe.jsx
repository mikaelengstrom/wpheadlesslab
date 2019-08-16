import React from 'react';

import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet-async';

import Blocks from '../../layout/Blocks';
import RawHtml from '../../components/RawHtml';

import * as cms from '../../services/cms';

const Recipe = observer(({ loading, id, url, pageData, initialProps }) => {
    const { title, content, featuredImage, recipeScore, recipeCategory, blocks } = pageData; 
    const { date } = initialProps; 

    return (
        <>
            <Helmet>
                <title>{`Recipe Page - ${title || ''}`}</title>
            </Helmet>
            <div>
                {loading &&
                    <h1>LOADING PAGE & PROPS!</h1>
                }

                <h1>Recept: {title}</h1>
                <h3>date initial prop: {date}</h3>

                {recipeCategory && 
                    <>
                        <h4>Recipe categories: </h4>
                        {recipeCategory.map((cat) =>
                            <p key={cat.slug}>{cat.name}</p>
                        )}
                    </>
                }

                <h4>Score: {recipeScore ? recipeScore : 'missing'}</h4>

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