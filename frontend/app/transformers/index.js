import camelcaseKeys from 'camelcase-keys';
import traverse from 'traverse';

import { 
    isStr,
    isArray, 
    flatten,
} from '../utils';

import config from '../config';

const routeTransformer = (routes) => {
    return camelcaseKeys(routes, { deep: true });
};

// transform any absolute url containing WP_HOME to a relative url
const transformToRelativeUrl = (item) => {
    const ignoreUrlsWith = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.ico'];

    let newItem = item; 

    if (isStr(item)) {
        const abort = ignoreUrlsWith
            .filter(fileType => item.indexOf(fileType) > -1)
            .length > 0;
        
        if (!abort && item.indexOf('http') > -1) {
            newItem = item.replace(config.wpHome, '')
        }
    }

    return newItem; 
}

const menuTransformer = (menuData) => {
    let menu = camelcaseKeys(menuData, { deep: true });

    traverse(menu.items)
        .forEach(function(item) {
            this.update(transformToRelativeUrl(item));
        });

    return menu;  
};

const featuredImageTransformer = (data) => {
    const imageData = camelcaseKeys(data, { deep: true });
    if(!('mediaDetails' in imageData)) {
        return null; 
    }

    const imageSizeTransformer = (imageSizes) => 
        Object.keys(imageSizes)
            .reduce((sizes, size, i) => {
                sizes[size] = {
                    file: imageSizes[size].file,
                    width: imageSizes[size].width, 
                    height: imageSizes[size].height, 
                    url: imageSizes[size].sourceUrl
                }; 

                return sizes; 
            }, {}); 

    return {
        slug: imageData.slug, 
        title: imageData.title.rendered,
        altText: imageData.altText, 
        caption: imageData.caption.rendered,
        mimeType: imageData.mimeType,
        sizes: imageSizeTransformer(imageData.mediaDetails.sizes)
    }
}

const taxonomyTermTransformer = (terms) => {
    const newTerms = flatten(terms)
        .reduce((fixedTerms, term) => {
            const tax = term['taxonomy'];

            if(!(tax in fixedTerms)) {
                fixedTerms[tax] = []; 
            }

            fixedTerms[tax].push(term);

            return fixedTerms; 
        }, {});

    return camelcaseKeys(newTerms);
};

const taxonomyCategoryTransformer = (category) => {
    return {
        id: category.id, 
        count: category.count, 
        name: category.name, 
        slug: category.slug, 
        description: category.description,
        taxonomy: category.taxonomy
    }
};

// this function will remove all wp post props except those we need and convert all keys to camel case, 
// the final object will look something like this: 
// 
// {
//     id,
//     date,
//     dateGmt,
//     modified,
//     modifiedGmt,
//     slug,
//     status, 
//     type, 
//     url, 
//     author, 
//     title, 
//     excerpt, 
//     content,
//     featuredImage,
//     ...
//     <registered acf properties in camel case if available> 
// }

const pageDataTransformer = (data) => {    
    const featuredImage = data['_embedded'] && data['_embedded']['wp:featuredmedia']
        ? featuredImageTransformer(data['_embedded']['wp:featuredmedia'][0])
        : null;

    const taxonomies = data['_embedded'] && data['_embedded']['wp:term']
        ? taxonomyTermTransformer(data['_embedded']['wp:term'])
        : null; 

    const keysToRemove = ['guid', 'featured_media', 'template', '_links', 'link', '_embedded']; 

    let pageData = Object.keys(data)
        .reduce((newData, key) => {
            if (keysToRemove.indexOf(key) === -1 && data[key]) {
                // don't include empty arrays 
                if (isArray(data[key]) && data[key].length === 0) {
                    return newData; 
                }

                newData[key] = data[key];
                
                traverse(newData[key]).forEach(function (item) {
                    this.update(transformToRelativeUrl(item));
                });
            }

            return newData; 
        }, {});

    pageData = {
        ...camelcaseKeys(pageData, { deep: true }), 
        ...taxonomies,
        title: data.title.rendered, 
        excerpt: data.excerpt.rendered, 
        content: data.content.rendered,
        featuredImage,
    };

    return pageData; 
};

export {
    routeTransformer,
    menuTransformer,
    featuredImageTransformer,
    taxonomyCategoryTransformer,
    pageDataTransformer
}