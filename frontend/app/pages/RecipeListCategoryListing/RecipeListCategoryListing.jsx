import React from 'react';

import { 
    Link,
    Redirect
} from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet-async';

import RawHtml from '../../components/RawHtml';

import * as cms from '../../services/cms';

import { 
    defined, 
    debug,
    runningInBrowser
} from '../../utils';

import { useStore } from '../../store';

const RecipeListCategoryListing = observer(({ loading, pageData, initialProps, urlParams }) => {
    const store = useStore(); 

    const { categorySlug } = urlParams; 
    const { title, content, featuredImage } = pageData; 
    const { category = {}, categoryPages = [] } = initialProps; 

    if (!defined(categorySlug)) {
        const parentUrl = store.getRouteByComponentName('RecipeList');

        return (
            <Redirect to={parentUrl} />
        );
    }

    return (
        <>
            <Helmet>
                <title>{`RecipeListCategoryListing Page - ${title || ''}`}</title>
            </Helmet>
            <div>
                {loading &&
                    <h1>LOADING PAGE & PROPS!</h1>
                }

                <h1>{title} - {category.name}</h1>
                <p>{category.description}</p>

                <RawHtml html={content} />

                {featuredImage &&
                    <img src={featuredImage.sizes.thumbnail.url} />
                }

                {!loading &&
                    <>
                        <h2>Pages in this category: </h2>
                        {categoryPages.length
                            ? categoryPages.map(page =>
                                <Link key={page.slug} to={page.url}>
                                    {page.title}
                                </Link>
                            )
                            : 'No recipes found :('
                        }
                    </>
                }

            </div>
        </>
    );
});

RecipeListCategoryListing.routeOptions = {
    params: ':categorySlug*'
};

RecipeListCategoryListing.getInitialProps = async ({ urlParams }) => {
    const { categorySlug } = urlParams; 

    if(!defined(categorySlug)) {
        return {}; 
    }

    const category = await cms.getTaxonomyCategorySlug('recipe_category', categorySlug);    
    const categoryPages = await cms.getPagesInCategory('recipe', 'recipe_category', category.id);

    return {
        category, 
        categoryPages
    }
};

export default RecipeListCategoryListing;