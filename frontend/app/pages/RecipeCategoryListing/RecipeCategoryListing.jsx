import React from 'react';

import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet-async';

import RawHtml from '../../components/RawHtml';

import * as cms from '../../services/cms';

import { useStore } from '../../store';

// import { debug } from '../../utils';

const RecipeCategoryListing = observer(({ loading, pageData, initialProps }) => {
    const store = useStore(); 
    const { title, content, featuredImage } = pageData; 

    console.dir('QUERY: ', store.currentQuery);
    // const { recipes, recipeCategories } = initialProps; 

    return (
        <>
            <Helmet>
                <title>{`RecipeCategoryListing Page - ${title || ''}`}</title>
            </Helmet>
            <div>
                {loading &&
                    <h1>LOADING PAGE & PROPS!</h1>
                }

                <h1>Recipe list page: {title}</h1>

                {featuredImage &&
                    <img src={featuredImage.sizes.thumbnail.url} />
                }
                
                <RawHtml html={content} />

            </div>
        </>
    );
});

// RecipeCategoryListing.getInitialProps = async () => {
//     const [recipes, recipeCategories] = await Promise.all([
//         cms.getPages('recipe'),
//         cms.getTaxonomyCategories('recipe_category')
//     ]);

//     return {
//         recipes,
//         recipeCategories
//     }
// };

export default RecipeCategoryListing;