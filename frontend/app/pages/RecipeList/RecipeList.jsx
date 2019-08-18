import React from 'react';

import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet-async';

import RawHtml from '../../components/RawHtml';

import * as cms from '../../services/cms';

const RecipeList = observer(({ loading, pageData, initialProps }) => {
    const { title, content, featuredImage } = pageData; 
    const { recipes, recipeCategories } = initialProps; 

    return (
        <>
            <Helmet>
                <title>{`RecipeList Page - ${title || ''}`}</title>
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

                <h2>Available recipe categories</h2>
                {recipeCategories && recipeCategories.length &&
                    <ul>
                        {recipeCategories.map(category =>
                            <li key={category.id}>
                                <Link to={`/recipes/recipes-by-category/?categoryId=${category.id}`}>
                                    {category.name}
                                </Link>
                            </li>
                        )}
                    </ul>
                }

                <h2>All recipes</h2>
                {recipes && recipes.length && 
                    <ul>
                        {recipes.map(recipe =>
                            <li key={recipe.slug}>
                                <Link to={recipe.url}>
                                    {recipe.title}
                                </Link>
                            </li>
                        )}
                    </ul>
                }

            </div>
        </>
    );
});

RecipeList.getInitialProps = async () => {
    const [recipes, recipeCategories] = await Promise.all([
        cms.getPages('recipe'),
        cms.getTaxonomyCategories('recipe_category')
    ]);

    return {
        recipes,
        recipeCategories
    }
};

export default RecipeList;