import camelcaseKeys from 'camelcase-keys';
import traverse from 'traverse';

import { 
    isStr,
} from '../utils';

import config from '../config';

const routeTransformer = (routes) => {
    return camelcaseKeys(routes, { deep: true });
};

const transformToRelativeUrl = (item) => {
    const ignoreUrlsWith = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.ico'];

    let newItem = item; 

    if (isStr(item)) {
        const abort = ignoreUrlsWith
            .filter(fileType => item.indexOf(fileType) > -1).length > 0;
        
        if (!abort && item.indexOf('http') > -1) {
            newItem = item.replace(config.wpHome, '')
        }
    }

    return newItem; 
}

const menuTransformer = (menuData) => {
    let menu = camelcaseKeys(menuData, { deep: true });

    traverse(menu.items).forEach(function(item) {
        this.update(transformToRelativeUrl(item));
    });

    return menu;  
};

const featuredImageTransformer = (data) => {
    const imageData = camelcaseKeys(data, { deep: true });

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
//     <acf properties in camel case if available> 
// }

const pageDataTransformer = (data) => {    
    const featuredImage = data['_embedded'] && data['_embedded']['wp:featuredmedia']
        ? featuredImageTransformer(data['_embedded']['wp:featuredmedia'][0])
        : null;
    
    const keysToRemove = ['guid', 'featured_media', 'template', '_links', 'link', '_embedded']; 

    let pageData = Object.keys(data)
        .reduce((newData, key) => {
            if(keysToRemove.indexOf(key) === -1) {
                newData[key] = data[key];
                
                traverse(newData[key]).forEach(function (item) {
                    this.update(transformToRelativeUrl(item));
                });
            }

            return newData; 
        }, {});

    pageData = {
        ...camelcaseKeys(pageData, { deep: true }), 
        title: data.title.rendered, 
        excerpt: data.excerpt.rendered, 
        content: data.content.rendered,
        featuredImage 
    };

    return pageData; 
};

export {
    routeTransformer,
    menuTransformer,
    featuredImageTransformer,
    pageDataTransformer
}