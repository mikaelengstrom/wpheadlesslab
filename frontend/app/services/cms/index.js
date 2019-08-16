import * as transformers from '../../transformers';

import config from '../../config';
import { debug } from '../../utils';

import axios from 'axios';

const base = `${config.appBase}/wp-json`;

// include auth cookies & wp nonce with req 
const authConfig = (nonce) => ({
    withCredentials: true, 
    headers: {
        'X-WP-Nonce': nonce,
        'Cache-Control': 'no-store'
    }
});

const endpoints = {
    routes: () => 
        `${base}/router/v1/all/`,
    primaryMenu: () =>
        `${base}/menus/v1/menus/primary_navigation`,
    media: (id) =>
        `${base}/wp/v2/media/${id}`,
    date: () =>
        `${base}/date`,

    page: (id) => 
        `${base}/wp/v2/pages/${id}?_embed`,
    post: (id) =>
        `${base}/wp/v2/posts/${id}?_embed`,
    cpt: (id, type) => 
        `${base}/wp/v2/${type}/${id}?_embed`,

    pages: () =>
        `${base}/wp/v2/pages?_embed`,
    posts: () =>
        `${base}/wp/v2/posts?_embed`,
    cpts: (type) =>
        `${base}/wp/v2/${type}?_embed`,

    pageRevisions: (id) => 
        `${base}/wp/v2/pages/${id}/revisions?filter[orderby]=date&order=desc`,
    pageRevision: (id, revisionId) =>
        `${base}/wp/v2/pages/${id}/revisions/${revisionId}?_embed`,

    postRevisions: (id) =>
        `${base}/wp/v2/posts/${id}/revisions?filter[orderby]=date&order=desc`,
    postRevision: (id, revisionId) =>
        `${base}/wp/v2/posts/${id}/revisions/${revisionId}?_embed`,

    cptRevisions: (id, type) =>
        `${base}/wp/v2/${type}/${id}/revisions?filter[orderby]=date&order=desc`,
    cptRevision: (id, type, revisionId) =>
        `${base}/wp/v2/${type}/${id}/revisions/${revisionId}?_embed`,

    taxonomyCategories: (name) => 
        `${base}/wp/v2/${name}`
};

debug('CMS Service: using base: ', base);

const getRoutes = async () => {
    const resp = await axios.get(endpoints.routes());
    return transformers
        .routeTransformer(resp.data);
}

const getPrimaryMenu = async () => {
    const resp = await axios.get(endpoints.primaryMenu());
    return transformers
        .menuTransformer(resp.data);
}

const getMedia = async (id, nonce) => {
    debug('CMS getMedia() called!');
    debug('CMS getMedia() nonce: ', nonce);
    debug('CMS getMedia() media id: ', id);

    const resp = await axios.get(endpoints.media(id), authConfig(nonce));
    debug('CMS getMedia() transformed data: ', transformers.featuredImageTransformer(resp.data));

    return transformers
        .featuredImageTransformer(resp.data) 
}

const getDate = async () => {
    return await axios.get(endpoints.date());
}

const getContent = async (id, type) => {
    let resp; 

    debug('CMS getContent(): fetching content for id: ', id);

    switch(type) {
        case 'page':
            resp = await axios.get(endpoints.page(id));
            break;
        case 'post':
            resp = await axios.get(endpoints.post(id));
            break;
        default: 
            resp = await axios.get(endpoints.cpt(id, type));
            break;
    }

    return transformers
        .pageDataTransformer(resp.data);
}

const getPages = async (type) => {
    let resp; 

    debug('CMS getPages(): fetching pages of type: ', type);

    switch(type) {
        case 'page':
            resp = await axios.get(endpoints.pages());
            break;
        case 'post':
            resp = await axios.get(endpoints.posts());
            break;
        default: 
            resp = await axios.get(endpoints.cpts(type));
            break;
    }

    return resp.data.map(data => 
        transformers.pageDataTransformer(data)
    ); 
}


const getRevisions = async (id, type, nonce) => {
    let resp;
    
    switch (type) {
        case 'page':
            resp = await axios.get(endpoints.pageRevisions(id), authConfig(nonce));
            break;
        case 'post':
            resp = await axios.get(endpoints.postRevisions(id), authConfig(nonce));
            break;
        default:
            resp = await axios.get(endpoints.cptRevisions(id, type), authConfig(nonce));
            break;
    }

    debug('CMS getRevisions(): fetched revision list for id: ', id, resp.data);

    return resp.data; 
}

const getRevision = async (id, type, revisionId, nonce) => {

    debug('CMS getRevision(): fetching revision content for id: ', id);

    let resp;
    switch (type) {
        case 'page':
            resp = await axios.get(endpoints.pageRevision(id, revisionId), authConfig(nonce));
            break;
        case 'post':
            resp = await axios.get(endpoints.postRevision(id, revisionId), authConfig(nonce));
            break;
        default:
            resp = await axios.get(endpoints.cptRevision(id, type, revisionId), authConfig(nonce));
            break;
    }

    return transformers
        .pageDataTransformer(resp.data);
}

const getContentPreview = async (id, type, previewMediaId, nonce) => {
    let pageData = {}, featuredImage = {}, revs = {};

    debug('CMS getContentPreview() called!');
    debug('CMS getContentPreview() nonce: ', nonce); 
    debug('CMS getContentPreview() preview media id: ', previewMediaId); 

    revs = await getRevisions(id, type, nonce);
    debug('CMS: received post revision list: ', revs);

    [featuredImage, pageData] = await Promise.all([
        previewMediaId > -1
            ? getMedia(previewMediaId, nonce)
            : undefined, 
        getRevision(id, type, revs[0].id, nonce)
    ]);

    debug('CMS: getContentPreview() - received preview media data: ', featuredImage);

    return {
        ...pageData, 
        featuredImage
    }
}

const getTaxonomyCategories = async (name) => {
    let resp = await axios.get(endpoints.taxonomyCategories(name));

    const categories = resp.data.map(category => 
        transformers.taxonomyCategoryTransformer(category)
    );

    debug('CMS getTaxonomyCategories(): received categories: ', categories);

    return categories;
}

export {
    getRoutes,
    getPrimaryMenu,
    getDate,
    getMedia, 
    getContent, 
    getContentPreview,
    getPages,
    getTaxonomyCategories
}