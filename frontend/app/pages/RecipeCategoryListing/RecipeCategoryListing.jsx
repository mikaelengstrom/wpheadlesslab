import React from 'react';

import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet-async';

import RawHtml from '../../components/RawHtml';

import * as cms from '../../services/cms';

import { debug } from '../../utils';

const RecipeCategoryListing = observer(({ loading, pageData, initialProps, pageQuery }) => {
    const { title, content, featuredImage } = pageData; 
    const { category = {}, categoryPages = [] } = initialProps; 
    
    return (
        <>
            <Helmet>
                <title>{`RecipeCategoryListing Page - ${title || ''}`}</title>
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
                            : 'No pages :('
                        }
                    </>
                }

            </div>
        </>
    );
});

RecipeCategoryListing.getInitialProps = async (pageQuery) => {
    const { categoryId } = pageQuery; 
    
    const [category, categoryPages] = await Promise.all([
        cms.getTaxonomyCategory('recipe_category', categoryId),
        cms.getPagesInCategory('recipe', 'recipe_category', categoryId)
    ]);

    debug(`RecipeCategoryListing> received pages for category id ${categoryId}: `, categoryPages);

    return {
        category, 
        categoryPages
    }
};

export default RecipeCategoryListing;