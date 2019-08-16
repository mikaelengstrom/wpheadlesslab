// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"mbFY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluckRandom = exports.random = exports.flatten = exports.zip = exports.reverse = exports.range = exports.isDevEnv = exports.runningOnServer = exports.runningInBrowser = exports.debug = exports.isStr = exports.isObj = exports.isArray = exports.isFn = exports.definedNotNull = exports.defined = void 0;

// helpers
const defined = obj => typeof obj !== 'undefined';

exports.defined = defined;

const definedNotNull = obj => defined(obj) && obj != null;

exports.definedNotNull = definedNotNull;

const isFn = fn => typeof fn === 'function';

exports.isFn = isFn;

const isArray = a => Array.isArray(a);

exports.isArray = isArray;

const isObj = obj => typeof obj === 'object';

exports.isObj = isObj;

const isStr = obj => typeof obj === 'string';

exports.isStr = isStr;
let debugState = true;

const debug = (...msg) => debugState ? console.warn(...msg) : undefined;

exports.debug = debug;

const runningInBrowser = () => process.env.BABEL_ENV === 'client';

exports.runningInBrowser = runningInBrowser;

const runningOnServer = () => process.env.BABEL_ENV === 'server';

exports.runningOnServer = runningOnServer;

const isDevEnv = () => process.env.NODE_ENV === 'development'; // ranges


exports.isDevEnv = isDevEnv;

const range = (...args) => {
  let [start, end] = args.length == 2 ? args : [0, args[0]];
  return Array.from({
    length: end - start
  }, (v, k) => k + start);
}; // array manipulation


exports.range = range;

const reverse = ([x, ...xs]) => typeof x !== 'undefined' ? [...reverse(xs), x] : [];

exports.reverse = reverse;

const flatten = ([x, ...xs]) => typeof x !== 'undefined' ? Array.isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)] : [];

exports.flatten = flatten;

const zip = (arr, ...arrs) => arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val])); // random no stuff


exports.zip = zip;

const random = (max = 1, min) => {
  if (defined(min)) {
    [min, max] = [max, min];
  } else {
    min = 0;
  }

  return Math.random() * (max - min) + min;
};

exports.random = random;

const pluckRandom = arr => arr[parseInt(random(arr.length))];

exports.pluckRandom = pluckRandom;
},{}],"LpuZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const generalConfig = {
  cacheTtl: 5 * 1000
};
const devDefaultConfig = {
  wpHome: 'http://repress.dev.test:8880',
  appBase: (0, _utils.runningOnServer)() && (0, _utils.isDevEnv)() ? 'http://web' : 'http://repress.dev.test:8880'
};
const wpInjectedConfig = (0, _utils.runningInBrowser)() && window.__FROJD_SETTINGS ? window.__FROJD_SETTINGS : {};

const config = _objectSpread({}, generalConfig, {}, devDefaultConfig, {}, wpInjectedConfig);

(0, _utils.debug)('Loaded config: ', config);
var _default = config;
exports.default = _default;
},{"../utils":"mbFY"}],"NR1n":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageDataTransformer = exports.taxonomyCategoryTransformer = exports.featuredImageTransformer = exports.menuTransformer = exports.routeTransformer = void 0;

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _traverse = _interopRequireDefault(require("traverse"));

var _utils = require("../utils");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const routeTransformer = routes => {
  return (0, _camelcaseKeys.default)(routes, {
    deep: true
  });
}; // transform any absolute url containing WP_HOME to a relative url


exports.routeTransformer = routeTransformer;

const transformToRelativeUrl = item => {
  const ignoreUrlsWith = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.ico'];
  let newItem = item;

  if ((0, _utils.isStr)(item)) {
    const abort = ignoreUrlsWith.filter(fileType => item.indexOf(fileType) > -1).length > 0;

    if (!abort && item.indexOf('http') > -1) {
      newItem = item.replace(_config.default.wpHome, '');
    }
  }

  return newItem;
};

const menuTransformer = menuData => {
  let menu = (0, _camelcaseKeys.default)(menuData, {
    deep: true
  });
  (0, _traverse.default)(menu.items).forEach(function (item) {
    this.update(transformToRelativeUrl(item));
  });
  return menu;
};

exports.menuTransformer = menuTransformer;

const featuredImageTransformer = data => {
  const imageData = (0, _camelcaseKeys.default)(data, {
    deep: true
  });

  if (!('mediaDetails' in imageData)) {
    return null;
  }

  const imageSizeTransformer = imageSizes => Object.keys(imageSizes).reduce((sizes, size, i) => {
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
  };
};

exports.featuredImageTransformer = featuredImageTransformer;

const taxonomyTermTransformer = terms => {
  const newTerms = (0, _utils.flatten)(terms).reduce((fixedTerms, term) => {
    const tax = term['taxonomy'];

    if (!(tax in fixedTerms)) {
      fixedTerms[tax] = [];
    }

    fixedTerms[tax].push(term);
    return fixedTerms;
  }, {});
  return (0, _camelcaseKeys.default)(newTerms);
};

const taxonomyCategoryTransformer = category => {
  return {
    id: category.id,
    count: category.count,
    name: category.name,
    slug: category.slug,
    description: category.description,
    taxonomy: category.taxonomy
  };
}; // this function will remove all wp post props except those we need and convert all keys to camel case, 
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


exports.taxonomyCategoryTransformer = taxonomyCategoryTransformer;

const pageDataTransformer = data => {
  const featuredImage = data['_embedded'] && data['_embedded']['wp:featuredmedia'] ? featuredImageTransformer(data['_embedded']['wp:featuredmedia'][0]) : null;
  const taxonomies = data['_embedded'] && data['_embedded']['wp:term'] ? taxonomyTermTransformer(data['_embedded']['wp:term']) : null;
  const keysToRemove = ['guid', 'featured_media', 'template', '_links', 'link', '_embedded'];
  let pageData = Object.keys(data).reduce((newData, key) => {
    if (keysToRemove.indexOf(key) === -1 && data[key]) {
      // don't include empty arrays 
      if ((0, _utils.isArray)(data[key]) && data[key].length === 0) {
        return newData;
      }

      newData[key] = data[key];
      (0, _traverse.default)(newData[key]).forEach(function (item) {
        this.update(transformToRelativeUrl(item));
      });
    }

    return newData;
  }, {});
  pageData = _objectSpread({}, (0, _camelcaseKeys.default)(pageData, {
    deep: true
  }), {}, taxonomies, {
    title: data.title.rendered,
    excerpt: data.excerpt.rendered,
    content: data.content.rendered,
    featuredImage
  });
  return pageData;
};

exports.pageDataTransformer = pageDataTransformer;
},{"../utils":"mbFY","../config":"LpuZ"}],"lAOr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTaxonomyCategories = exports.getPages = exports.getContentPreview = exports.getContent = exports.getMedia = exports.getDate = exports.getPrimaryMenu = exports.getRoutes = void 0;

var transformers = _interopRequireWildcard(require("../../transformers"));

var _config = _interopRequireDefault(require("../../config"));

var _utils = require("../../utils");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const base = `${_config.default.appBase}/wp-json`; // include auth cookies & wp nonce with req 

const authConfig = nonce => ({
  withCredentials: true,
  headers: {
    'X-WP-Nonce': nonce,
    'Cache-Control': 'no-store'
  }
});

const endpoints = {
  routes: () => `${base}/router/v1/all/`,
  primaryMenu: () => `${base}/menus/v1/menus/primary_navigation`,
  media: id => `${base}/wp/v2/media/${id}`,
  date: () => `${base}/date`,
  page: id => `${base}/wp/v2/pages/${id}?_embed`,
  post: id => `${base}/wp/v2/posts/${id}?_embed`,
  cpt: (id, type) => `${base}/wp/v2/${type}/${id}?_embed`,
  pages: () => `${base}/wp/v2/pages?_embed`,
  posts: () => `${base}/wp/v2/posts?_embed`,
  cpts: type => `${base}/wp/v2/${type}?_embed`,
  pageRevisions: id => `${base}/wp/v2/pages/${id}/revisions?filter[orderby]=date&order=desc`,
  pageRevision: (id, revisionId) => `${base}/wp/v2/pages/${id}/revisions/${revisionId}?_embed`,
  postRevisions: id => `${base}/wp/v2/posts/${id}/revisions?filter[orderby]=date&order=desc`,
  postRevision: (id, revisionId) => `${base}/wp/v2/posts/${id}/revisions/${revisionId}?_embed`,
  cptRevisions: (id, type) => `${base}/wp/v2/${type}/${id}/revisions?filter[orderby]=date&order=desc`,
  cptRevision: (id, type, revisionId) => `${base}/wp/v2/${type}/${id}/revisions/${revisionId}?_embed`,
  taxonomyCategories: name => `${base}/wp/v2/${name}`
};
(0, _utils.debug)('CMS Service: using base: ', base);

const getRoutes = async () => {
  const resp = await _axios.default.get(endpoints.routes());
  return transformers.routeTransformer(resp.data);
};

exports.getRoutes = getRoutes;

const getPrimaryMenu = async () => {
  const resp = await _axios.default.get(endpoints.primaryMenu());
  return transformers.menuTransformer(resp.data);
};

exports.getPrimaryMenu = getPrimaryMenu;

const getMedia = async (id, nonce) => {
  (0, _utils.debug)('CMS getMedia() called!');
  (0, _utils.debug)('CMS getMedia() nonce: ', nonce);
  (0, _utils.debug)('CMS getMedia() media id: ', id);
  const resp = await _axios.default.get(endpoints.media(id), authConfig(nonce));
  (0, _utils.debug)('CMS getMedia() transformed data: ', transformers.featuredImageTransformer(resp.data));
  return transformers.featuredImageTransformer(resp.data);
};

exports.getMedia = getMedia;

const getDate = async () => {
  return await _axios.default.get(endpoints.date());
};

exports.getDate = getDate;

const getContent = async (id, type) => {
  let resp;
  (0, _utils.debug)('CMS getContent(): fetching content for id: ', id);

  switch (type) {
    case 'page':
      resp = await _axios.default.get(endpoints.page(id));
      break;

    case 'post':
      resp = await _axios.default.get(endpoints.post(id));
      break;

    default:
      resp = await _axios.default.get(endpoints.cpt(id, type));
      break;
  }

  return transformers.pageDataTransformer(resp.data);
};

exports.getContent = getContent;

const getPages = async type => {
  let resp;
  (0, _utils.debug)('CMS getPages(): fetching pages of type: ', type);

  switch (type) {
    case 'page':
      resp = await _axios.default.get(endpoints.pages());
      break;

    case 'post':
      resp = await _axios.default.get(endpoints.posts());
      break;

    default:
      resp = await _axios.default.get(endpoints.cpts(type));
      break;
  }

  return resp.data.map(data => transformers.pageDataTransformer(data));
};

exports.getPages = getPages;

const getRevisions = async (id, type, nonce) => {
  let resp;

  switch (type) {
    case 'page':
      resp = await _axios.default.get(endpoints.pageRevisions(id), authConfig(nonce));
      break;

    case 'post':
      resp = await _axios.default.get(endpoints.postRevisions(id), authConfig(nonce));
      break;

    default:
      resp = await _axios.default.get(endpoints.cptRevisions(id, type), authConfig(nonce));
      break;
  }

  (0, _utils.debug)('CMS getRevisions(): fetched revision list for id: ', id, resp.data);
  return resp.data;
};

const getRevision = async (id, type, revisionId, nonce) => {
  (0, _utils.debug)('CMS getRevision(): fetching revision content for id: ', id);
  let resp;

  switch (type) {
    case 'page':
      resp = await _axios.default.get(endpoints.pageRevision(id, revisionId), authConfig(nonce));
      break;

    case 'post':
      resp = await _axios.default.get(endpoints.postRevision(id, revisionId), authConfig(nonce));
      break;

    default:
      resp = await _axios.default.get(endpoints.cptRevision(id, type, revisionId), authConfig(nonce));
      break;
  }

  return transformers.pageDataTransformer(resp.data);
};

const getContentPreview = async (id, type, previewMediaId, nonce) => {
  let pageData = {},
      featuredImage = {},
      revs = {};
  (0, _utils.debug)('CMS getContentPreview() called!');
  (0, _utils.debug)('CMS getContentPreview() nonce: ', nonce);
  (0, _utils.debug)('CMS getContentPreview() preview media id: ', previewMediaId);
  revs = await getRevisions(id, type, nonce);
  (0, _utils.debug)('CMS: received post revision list: ', revs);
  [featuredImage, pageData] = await Promise.all([previewMediaId > -1 ? getMedia(previewMediaId, nonce) : undefined, getRevision(id, type, revs[0].id, nonce)]);
  (0, _utils.debug)('CMS: getContentPreview() - received preview media data: ', featuredImage);
  return _objectSpread({}, pageData, {
    featuredImage
  });
};

exports.getContentPreview = getContentPreview;

const getTaxonomyCategories = async name => {
  let resp = await _axios.default.get(endpoints.taxonomyCategories(name));
  const categories = resp.data.map(category => transformers.taxonomyCategoryTransformer(category));
  (0, _utils.debug)('CMS getTaxonomyCategories(): received categories: ', categories);
  return categories;
};

exports.getTaxonomyCategories = getTaxonomyCategories;
},{"../../transformers":"NR1n","../../config":"LpuZ","../../utils":"mbFY"}],"/FFy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.remove = exports.set = exports.hasKey = exports.setTtl = void 0;

var _utils = require("../../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultTtl = 10 * 1000;
let currentTtl = defaultTtl;
let entries = {};

const now = () => new Date().getTime();

const setTtl = ttl => {
  (0, _utils.debug)(`Cache: setting cache ttl to ${ttl}ms`);
  currentTtl = ttl;
};

exports.setTtl = setTtl;

const remove = key => entries = Object.keys(entries).reduce((obj, k) => {
  if (k !== key) {
    obj[k] = entries[k];
  }

  return obj;
}, {});

exports.remove = remove;

const hasKey = key => {
  if (!(key in entries)) {
    return false;
  }

  const entry = entries[key];

  if (now() - entry.timestamp > currentTtl) {
    (0, _utils.debug)(`Cache: entry with key "${key}" has expired`);
    remove(key);
    return false;
  }

  return true;
};

exports.hasKey = hasKey;

const set = (key, value) => entries = _objectSpread({}, entries, {
  [key]: {
    value,
    timestamp: now()
  }
});

exports.set = set;

const get = key => {
  if (!(key in entries)) {
    return null;
  }

  const entry = entries[key];

  if (now() - entry.timestamp > currentTtl) {
    (0, _utils.debug)(`Cache: entry with key "${key}" has expired`);
    remove(key);
    return null;
  }

  (0, _utils.debug)(`Cache: found entry with key "${key}", time left: `, now() - entry.timestamp);
  return entry.value;
};

exports.get = get;
},{"../../utils":"mbFY"}],"uhQu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _queryString = _interopRequireDefault(require("query-string"));

var _utils = require("../utils");

var _config = _interopRequireDefault(require("../config"));

var cms = _interopRequireWildcard(require("../services/cms"));

var cache = _interopRequireWildcard(require("../services/cache"));

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

let Store = (_class = (_temp = class Store {
  constructor(initialState) {
    this.debug = true;
    this.states = {
      error: 'error',
      loading: 'loading',
      ready: 'ready'
    };

    _initializerDefineProperty(this, "state", _descriptor, this);

    _initializerDefineProperty(this, "error", _descriptor2, this);

    this.serverSideBootstrapped = false;
    this.locationChanged = false;
    this.currentQuery = {};
    this.wpRestNonce = {};
    this.isLoggedIn = false;

    _initializerDefineProperty(this, "routes", _descriptor3, this);

    _initializerDefineProperty(this, "primaryMenu", _descriptor4, this);

    _initializerDefineProperty(this, "loadingPageAndProps", _descriptor5, this);

    _initializerDefineProperty(this, "pageData", _descriptor6, this);

    _initializerDefineProperty(this, "pageInitialProps", _descriptor7, this);

    (0, _mobx.configure)({
      enforceActions: 'always'
    });
    (0, _mobx.runInAction)(() => {
      Object.assign(this, initialState || {});
    });
    cache.setTtl(_config.default.cacheTtl);
    this.updateQueryParams();
  } // main ui state


  async bootstrap() {
    (0, _utils.debug)('Store: bootstrapping!');

    if ((0, _utils.runningInBrowser)() && (0, _utils.defined)(window.__FROJD_SETTINGS)) {
      this.wpRestNonce = window.__FROJD_SETTINGS.wpRestNonce;
      this.isLoggedIn = window.__FROJD_SETTINGS.wpLoggedIn;
      (0, _utils.debug)('Store: is logged in to WP: ', this.isLoggedIn);
      (0, _utils.debug)('Store: using injected wp rest nonce: ', this.wpRestNonce);
    }

    await Promise.all([this.loadRoutes(), this.loadPrimaryMenu()]);
    (0, _utils.debug)('Store: loaded routes & menus!');
    (0, _mobx.runInAction)(() => {
      this.state = this.states.ready;
    });
  } // getters / setters 


  setLocationChanged(bool) {
    this.locationChanged = bool;
  }

  setServerSideBootstrapped(bool) {
    this.serverSideBootstrapped = bool;
  }

  setQueryParams(params) {
    (0, _utils.debug)('Store: setting query params to: ', params);
    this.currentQuery = params;
  }

  hasQueryParams() {
    return Object.keys(this.currentQuery).length > 0;
  }

  hasPreviewQuery() {
    return this.hasQueryParams() && 'preview' in this.currentQuery && this.currentQuery['preview'] === 'true';
  }

  updateQueryParams() {
    if ((0, _utils.runningInBrowser)()) {
      this.setQueryParams(_queryString.default.parse(window.location.search));
    }
  }

  getError() {
    if ((0, _utils.isStr)(this.error)) {
      return this.error;
    }

    if ((0, _utils.isObj)(this.error) && 'stack' in this.error) {
      return this.error.stack;
    }

    if ((0, _utils.isObj)(this.error) && 'message' in this.error) {
      return this.error.message;
    }

    return null;
  } // actions


  async loadRoutes() {
    try {
      const routes = await cms.getRoutes();
      (0, _mobx.runInAction)(() => {
        this.routes = routes;
      });
    } catch (error) {
      (0, _mobx.runInAction)(() => {
        this.state = this.states.error;
        this.error = error;
      });
    }
  }

  async loadPrimaryMenu() {
    try {
      const menu = await cms.getPrimaryMenu();
      (0, _mobx.runInAction)(() => {
        this.primaryMenu = menu;
      });
    } catch (error) {
      (0, _mobx.runInAction)(() => {
        this.state = this.states.error;
        this.error = error;
      });
    }
  }

  async loadContentAndInitialProps(id, type, getInitialProps) {
    this.updateQueryParams();
    (0, _utils.debug)('Store: loadContentAndInitialProps() called - loading content and initial props');
    (0, _utils.debug)('Store: current query params: ', this.currentQuery); // clear page data 
    // (in order to not render incorrect data on new page while new page data is loading)

    this.pageData = _mobx.observable.object({});
    (0, _utils.debug)('Store: cleared pageData'); // clear initial props
    // (in order to not render incorrect data on new page while new page props are loading)

    this.pageInitialProps = _mobx.observable.object({});
    (0, _utils.debug)('Store: cleared pageInitialProps');
    this.loadingPageAndProps = true;

    const loadContent = () => this.hasPreviewQuery() ? this.loadContentPreview(id, type) : this.loadContent(id, type);

    const loadInitialProps = () => (0, _utils.isFn)(getInitialProps) ? this.loadInitialProps(getInitialProps) : undefined;

    await Promise.all([loadContent(), loadInitialProps()]);
    (0, _mobx.runInAction)(() => {
      this.loadingPageAndProps = false;
    });
  }

  async loadContent(id, type) {
    (0, _utils.debug)('Store: loadContent() called - loading page data ');

    if (cache.hasKey(id)) {
      // this.pageData = observable.object({});
      (0, _mobx.set)(this.pageData, cache.get(id));
      (0, _utils.debug)('Store: loadContent() - page data found in cache, returning cached data');
      return;
    }

    try {
      const content = await cms.getContent(id, type);
      (0, _mobx.runInAction)(() => {
        // this.pageData = observable.object({}); 
        cache.set(id, content);
        (0, _mobx.set)(this.pageData, content);
        (0, _utils.debug)('Store: set pageData: ', this.pageData);
      });
    } catch (error) {
      (0, _mobx.runInAction)(() => {
        this.state = this.states.error;
        this.error = error;
      });
    }
  }

  async loadContentPreview(id, type) {
    const mediaId = '_thumbnail_id' in this.currentQuery ? this.currentQuery['_thumbnail_id'] : -1;
    (0, _utils.debug)('Store: loadContentPreview() called - loading PREVIEW page data ');
    (0, _utils.debug)('Store: loadContentPreview() - will load featured media preview with media id: ', mediaId);

    try {
      const content = await cms.getContentPreview(id, type, mediaId, this.wpRestNonce);
      (0, _mobx.runInAction)(() => {
        (0, _utils.debug)('Store: setting PREVIEW pageData: ', this.pageData);
        (0, _mobx.set)(this.pageData, content);
      });
    } catch (error) {
      (0, _mobx.runInAction)(() => {
        (0, _utils.debug)('Store: loadContentPreview() FAILED, reason: ', error);
        this.state = this.states.error;
        this.error = error;
      });
    }
  }

  async loadInitialProps(getInitialProps) {
    (0, _utils.debug)('Store: loadInitialProps() called - loading props!');

    try {
      const props = await getInitialProps();
      (0, _utils.debug)('Store: fetched initial props!');
      (0, _mobx.runInAction)(() => {
        (0, _mobx.set)(this.pageInitialProps, props);
      });
    } catch (error) {
      (0, _mobx.runInAction)(() => {
        this.state = this.states.error;
        this.error = error;
      });
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "state", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.states.loading;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "error", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "routes", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "primaryMenu", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "loadingPageAndProps", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "pageData", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _mobx.observable.object({});
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "pageInitialProps", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _mobx.observable.object({});
  }
}), _applyDecoratedDescriptor(_class.prototype, "bootstrap", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "bootstrap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadRoutes", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadRoutes"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadPrimaryMenu", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadPrimaryMenu"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadContentAndInitialProps", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadContentAndInitialProps"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadContent", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadContent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadContentPreview", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadContentPreview"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadInitialProps", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadInitialProps"), _class.prototype)), _class);
var _default = Store;
exports.default = _default;
},{"../utils":"mbFY","../config":"LpuZ","../services/cms":"lAOr","../services/cache":"/FFy"}],"28Kg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function () {
    return _Store.default;
  }
});
exports.rehydrate = exports.dehydrate = exports.useStore = exports.MockStoreProvider = exports.StoreProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobx = require("mobx");

var _jsonStringifySafe = _interopRequireDefault(require("json-stringify-safe"));

var base64 = _interopRequireWildcard(require("base64util"));

var _utils = require("../utils");

var _Store = _interopRequireDefault(require("./Store"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let defaultStore = new _Store.default();

const storeContext = _react.default.createContext();

const StoreProvider = ({
  store,
  children
}) => {
  const __store = (0, _utils.definedNotNull)(store) ? store : defaultStore;

  return _react.default.createElement(storeContext.Provider, {
    value: __store
  }, children);
};

exports.StoreProvider = StoreProvider;

const MockStoreProvider = ({
  store,
  children
}) => {
  return _react.default.createElement(storeContext.Provider, {
    value: store
  }, children);
};

exports.MockStoreProvider = MockStoreProvider;

const dehydrate = store => {
  return base64.encode((0, _jsonStringifySafe.default)((0, _mobx.toJS)(store, true)));
};

exports.dehydrate = dehydrate;

const rehydrate = storeJson => {
  return JSON.parse(base64.decode(storeJson));
};

exports.rehydrate = rehydrate;

const useStore = () => {
  const store = _react.default.useContext(storeContext);

  if (!store) {
    throw new Error('You\'ve forgotten to use <StoreProvider/>, well shame on you...');
  }

  return store;
}; // hydrate ssr 


exports.useStore = useStore;

if ((0, _utils.runningInBrowser)() && (0, _utils.definedNotNull)(window.__FROJD_STATE)) {
  let state = rehydrate(window.__FROJD_STATE);
  defaultStore = new _Store.default(state);
  (0, _utils.debug)('Hydrated store with state: ', state);
} else if ((0, _utils.runningInBrowser)()) {
  // ssr failed/not available, start bootstrap
  (0, _utils.debug)('Could not find dehydrated state, bootstrapping store!');
  defaultStore.bootstrap();
}
},{"../utils":"mbFY","./Store":"uhQu"}],"dy0w":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

// compare current & prev. props 
function usePrevious(value) {
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

var _default = usePrevious;
exports.default = _default;
},{}],"q9re":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _queryString = _interopRequireDefault(require("query-string"));

var _store = require("../../store");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useForceSsrLoad() {
  const store = (0, _store.useStore)();
  const [didReload, setDidReload] = (0, _react.useState)(false);

  if (process.env.BABEL_ENV === 'client' && store.serverSideBootstrapped) {
    const {
      r
    } = _queryString.default.parse(location.search);

    if (!r && !didReload && store.locationChanged) {
      (0, _utils.debug)('useForceSsrLoad() hook: page not yet reloaded - reloading!');
      setDidReload(true);
      window.location = `${window.location}?r=true`;
      return true;
    }

    if (!r && didReload) {
      return true;
    }
  }

  (0, _utils.debug)('useForceSsrLoad() hook: NOT reloading!');
  return false;
}

var _default = useForceSsrLoad;
exports.default = _default;
},{"../../store":"28Kg","../../utils":"mbFY"}],"k74t":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "usePrevious", {
  enumerable: true,
  get: function () {
    return _usePrevious.default;
  }
});
Object.defineProperty(exports, "useForceSsrLoad", {
  enumerable: true,
  get: function () {
    return _useForceSsrLoad.default;
  }
});

var _usePrevious = _interopRequireDefault(require("./use-previous"));

var _useForceSsrLoad = _interopRequireDefault(require("./use-force-ssr-load"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./use-previous":"dy0w","./use-force-ssr-load":"q9re"}],"/yl4":[function(require,module,exports) {

},{}],"wi7Z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _mobxReactLite = require("mobx-react-lite");

var _store = require("../../store");

require("./Header.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Header = (0, _mobxReactLite.observer)(() => {
  let store = (0, _store.useStore)();
  return _react.default.createElement("header", {
    className: "Header"
  }, store.primaryMenu && store.primaryMenu.items.map((item, i) => _react.default.createElement(_reactRouterDom.Link, {
    className: "Header__Link",
    key: i,
    to: item.url
  }, item.title)));
});
var _default = Header;
exports.default = _default;
},{"../../store":"28Kg","./Header.scss":"/yl4"}],"ZlR1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Header = _interopRequireDefault(require("./Header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Header.default;
exports.default = _default;
},{"./Header":"wi7Z"}],"yI0r":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHelmetAsync = require("react-helmet-async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PropTypes from 'prop-types';
const NotFound = ({
  message
}) => {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmetAsync.Helmet, null, _react.default.createElement("title", null, "404")), _react.default.createElement("div", null, _react.default.createElement("h1", null, "404"), _react.default.createElement("p", null, message)));
};

NotFound.defaultProps = {
  message: 'The page could not be found'
};
var _default = NotFound;
exports.default = _default;
},{}],"e6rX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NotFound = _interopRequireDefault(require("./NotFound"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _NotFound.default;
exports.default = _default;
},{"./NotFound":"yI0r"}],"zW8L":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHelmetAsync = require("react-helmet-async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PropTypes from 'prop-types';
const Error = ({
  code = '500',
  message
}) => {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmetAsync.Helmet, null, _react.default.createElement("title", null, "Error ", code)), _react.default.createElement("div", null, _react.default.createElement("h1", null, "Error - ", code), _react.default.createElement("p", null, message)));
};

Error.defaultProps = {
  message: 'The page could not be found'
};
var _default = Error;
exports.default = _default;
},{}],"ARH/":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Error = _interopRequireDefault(require("./Error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Error.default;
exports.default = _default;
},{"./Error":"zW8L"}],"Zbms":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const RawHtml = (_ref) => {
  let {
    html
  } = _ref,
      props = _objectWithoutProperties(_ref, ["html"]);

  return _react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
};

var _default = RawHtml;
exports.default = _default;
},{}],"Yzzv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RawHtml = _interopRequireDefault(require("./RawHtml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _RawHtml.default;
exports.default = _default;
},{"./RawHtml":"Zbms"}],"/nU+":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _reactHelmetAsync = require("react-helmet-async");

var _RawHtml = _interopRequireDefault(require("../../components/RawHtml"));

var _cms = require("../../services/cms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Start = (0, _mobxReactLite.observer)(({
  pageData,
  initialProps
}) => {
  const {
    date
  } = initialProps;
  const {
    title,
    content,
    featuredImage
  } = pageData;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmetAsync.Helmet, null, _react.default.createElement("title", null, "Start Page")), _react.default.createElement("div", null, _react.default.createElement("h1", null, "Start page: ", title), featuredImage && _react.default.createElement("img", {
    src: featuredImage.sizes.thumbnail.url
  }), _react.default.createElement("p", null, "date initial prop: ", date), _react.default.createElement(_RawHtml.default, {
    html: content
  })));
});

Start.getInitialProps = async () => {
  let resp = await (0, _cms.getDate)();
  return {
    date: resp.data['date']
  };
};

var _default = Start;
exports.default = _default;
},{"../../components/RawHtml":"Yzzv","../../services/cms":"lAOr"}],"gTCO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Start = _interopRequireDefault(require("./Start"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Start.default;
exports.default = _default;
},{"./Start":"/nU+"}],"HIDF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _reactHelmetAsync = require("react-helmet-async");

var _RawHtml = _interopRequireDefault(require("../../components/RawHtml"));

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Page = (0, _mobxReactLite.observer)(({
  pageData
}) => {
  const {
    title,
    content,
    featuredImage
  } = pageData;
  const willReload = (0, _hooks.useForceSsrLoad)();

  if (willReload) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmetAsync.Helmet, null, _react.default.createElement("title", null, "Page")), _react.default.createElement("div", null, _react.default.createElement("h1", null, "A page: ", title), featuredImage && _react.default.createElement("img", {
    src: featuredImage.sizes.thumbnail.url
  }), _react.default.createElement(_RawHtml.default, {
    html: content
  })));
});
var _default = Page;
exports.default = _default;
},{"../../components/RawHtml":"Yzzv","../../hooks":"k74t"}],"vry0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Page = _interopRequireDefault(require("./Page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Page.default;
exports.default = _default;
},{"./Page":"HIDF"}],"y8jq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _reactHelmetAsync = require("react-helmet-async");

var _RawHtml = _interopRequireDefault(require("../../components/RawHtml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Post = (0, _mobxReactLite.observer)(({
  pageData
}) => {
  const {
    title,
    content,
    featuredImage
  } = pageData;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmetAsync.Helmet, null, _react.default.createElement("title", null, "Post")), _react.default.createElement("div", null, _react.default.createElement("h1", null, "A poooost: ", title), featuredImage && _react.default.createElement("img", {
    src: featuredImage.sizes.thumbnail.url
  }), _react.default.createElement(_RawHtml.default, {
    html: content
  })));
});
var _default = Post;
exports.default = _default;
},{"../../components/RawHtml":"Yzzv"}],"Dk/9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Post = _interopRequireDefault(require("./Post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Post.default;
exports.default = _default;
},{"./Post":"y8jq"}],"Rmkp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./UnknownBlock.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UnknownBlock = ({
  missingComponentId
}) => {
  return _react.default.createElement("div", {
    className: "UnknownBlock"
  }, "Could not find block with id: \"", missingComponentId, "\"");
};

var _default = UnknownBlock;
exports.default = _default;
},{"./UnknownBlock.scss":"/yl4"}],"KKpl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UnknownBlock = _interopRequireDefault(require("./UnknownBlock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _UnknownBlock.default;
exports.default = _default;
},{"./UnknownBlock":"Rmkp"}],"map+":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _reactRouterDom = require("react-router-dom");

require("./BlurbFull.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BlurbFull = (0, _mobxReactLite.observer)(({
  title,
  image,
  link
}) => {
  return _react.default.createElement("div", {
    className: "BlurbFull"
  }, _react.default.createElement("h1", null, title), image && _react.default.createElement("img", {
    src: image
  }), _react.default.createElement(_reactRouterDom.Link, {
    to: link.url
  }, "Click here"));
});
var _default = BlurbFull;
exports.default = _default;
},{"./BlurbFull.scss":"/yl4"}],"wkiv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BlurbFull = _interopRequireDefault(require("./BlurbFull"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _BlurbFull.default;
exports.default = _default;
},{"./BlurbFull":"map+"}],"H8//":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _reactRouterDom = require("react-router-dom");

require("./BlurbBg.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BlurbBg = (0, _mobxReactLite.observer)(({
  title,
  image,
  link
}) => {
  return _react.default.createElement("div", {
    style: {
      backgroundImage: `url('${image}')`
    },
    className: "BlurbBg"
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: link.url
  }, "Click here"));
});
var _default = BlurbBg;
exports.default = _default;
},{"./BlurbBg.scss":"/yl4"}],"bXZX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BlurbBg = _interopRequireDefault(require("./BlurbBg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _BlurbBg.default;
exports.default = _default;
},{"./BlurbBg":"H8//"}],"Q2rm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _utils = require("../../utils");

var _UnknownBlock = _interopRequireDefault(require("../../blocks/UnknownBlock"));

var _BlurbFull = _interopRequireDefault(require("../../blocks/BlurbFull"));

var _BlurbBg = _interopRequireDefault(require("../../blocks/BlurbBg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const blockComponents = {
  'blurb_full': _BlurbFull.default,
  'blurb_bg': _BlurbBg.default
}; //

const Blocks = (0, _mobxReactLite.observer)(({
  items
}) => {
  (0, _utils.debug)('Blocks> passed block items: ', items);

  if (!items || !items.length) {
    return null;
  }

  return _react.default.createElement("div", {
    className: "Blocks"
  }, items.map((block, i) => {
    const {
      acfFcLayout
    } = block,
          props = _objectWithoutProperties(block, ["acfFcLayout"]);

    if (!(acfFcLayout in blockComponents)) {
      return _react.default.createElement(_UnknownBlock.default, {
        key: i,
        missingComponentId: acfFcLayout
      });
    }

    const Block = blockComponents[acfFcLayout];
    (0, _utils.debug)(`Blocks> found block component for ${acfFcLayout}: `, Block);
    (0, _utils.debug)('Blocks> passing block props: ', props);
    return _react.default.createElement(Block, _extends({
      key: i
    }, props));
  }));
});
var _default = Blocks;
exports.default = _default;
},{"../../utils":"mbFY","../../blocks/UnknownBlock":"KKpl","../../blocks/BlurbFull":"wkiv","../../blocks/BlurbBg":"bXZX"}],"bKA5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Blocks = _interopRequireDefault(require("./Blocks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Blocks.default;
exports.default = _default;
},{"./Blocks":"Q2rm"}],"a2KQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _reactHelmetAsync = require("react-helmet-async");

var _Blocks = _interopRequireDefault(require("../../layout/Blocks"));

var _RawHtml = _interopRequireDefault(require("../../components/RawHtml"));

var cms = _interopRequireWildcard(require("../../services/cms"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Recipe = (0, _mobxReactLite.observer)(({
  loading,
  id,
  url,
  pageData,
  initialProps
}) => {
  const {
    title,
    content,
    featuredImage,
    recipeScore,
    recipeCategory,
    blocks
  } = pageData;
  const {
    date
  } = initialProps;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmetAsync.Helmet, null, _react.default.createElement("title", null, `Recipe Page - ${title || ''}`)), _react.default.createElement("div", null, loading && _react.default.createElement("h1", null, "LOADING PAGE & PROPS!"), _react.default.createElement("h1", null, "Recept: ", title), _react.default.createElement("h3", null, "date initial prop: ", date), recipeCategory && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("h4", null, "Recipe categories: "), recipeCategory.map(cat => _react.default.createElement("p", {
    key: cat.slug
  }, cat.name))), _react.default.createElement("h4", null, "Score: ", recipeScore ? recipeScore : 'missing'), featuredImage && _react.default.createElement("img", {
    src: featuredImage.sizes.thumbnail.url
  }), _react.default.createElement("p", null, "id: ", id), _react.default.createElement("p", null, "url: ", url), _react.default.createElement(_RawHtml.default, {
    html: content
  }), blocks && _react.default.createElement(_Blocks.default, {
    items: blocks
  })));
});

Recipe.getInitialProps = async () => {
  const resp = await cms.getDate();
  return {
    date: resp.data['date']
  };
};

var _default = Recipe;
exports.default = _default;
},{"../../layout/Blocks":"bKA5","../../components/RawHtml":"Yzzv","../../services/cms":"lAOr"}],"FRwr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Recipe = _interopRequireDefault(require("./Recipe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Recipe.default;
exports.default = _default;
},{"./Recipe":"a2KQ"}],"FiW8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _mobxReactLite = require("mobx-react-lite");

var _reactHelmetAsync = require("react-helmet-async");

var _RawHtml = _interopRequireDefault(require("../../components/RawHtml"));

var cms = _interopRequireWildcard(require("../../services/cms"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { debug } from '../../utils';
const RecipeList = (0, _mobxReactLite.observer)(({
  loading,
  pageData,
  initialProps
}) => {
  const {
    title,
    content,
    featuredImage
  } = pageData;
  const {
    recipes,
    recipeCategories
  } = initialProps;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmetAsync.Helmet, null, _react.default.createElement("title", null, `RecipeList Page - ${title || ''}`)), _react.default.createElement("div", null, loading && _react.default.createElement("h1", null, "LOADING PAGE & PROPS!"), _react.default.createElement("h1", null, "Recipe list page: ", title), featuredImage && _react.default.createElement("img", {
    src: featuredImage.sizes.thumbnail.url
  }), _react.default.createElement(_RawHtml.default, {
    html: content
  }), _react.default.createElement("h2", null, "Available recipe categories"), recipeCategories && recipeCategories.length && _react.default.createElement("ul", null, recipeCategories.map(category => _react.default.createElement("li", {
    key: category.id
  }, category.name))), _react.default.createElement("h2", null, "All recipes"), recipes && recipes.length && _react.default.createElement("ul", null, recipes.map(recipe => _react.default.createElement("li", {
    key: recipe.slug
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: recipe.url
  }, recipe.title))))));
});

RecipeList.getInitialProps = async () => {
  const [recipes, recipeCategories] = await Promise.all([cms.getPages('recipe'), cms.getTaxonomyCategories('recipe_category')]);
  return {
    recipes,
    recipeCategories
  };
};

var _default = RecipeList;
exports.default = _default;
},{"../../components/RawHtml":"Yzzv","../../services/cms":"lAOr"}],"VrZy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RecipeList = _interopRequireDefault(require("./RecipeList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _RecipeList.default;
exports.default = _default;
},{"./RecipeList":"FiW8"}],"ISOy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _mobxReactLite = require("mobx-react-lite");

var _store = require("./store");

var _hooks = require("./hooks");

var _Header = _interopRequireDefault(require("./layout/Header"));

var _NotFound = _interopRequireDefault(require("./pages/NotFound"));

var _Error = _interopRequireDefault(require("./pages/Error"));

var _Start = _interopRequireDefault(require("./pages/Start"));

var _Page = _interopRequireDefault(require("./pages/Page"));

var _Post = _interopRequireDefault(require("./pages/Post"));

var _Recipe = _interopRequireDefault(require("./pages/Recipe"));

var _RecipeList = _interopRequireDefault(require("./pages/RecipeList"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const pageComponents = {
  'Start': _Start.default,
  'Page': _Page.default,
  'Post': _Post.default,
  'Recipe': _Recipe.default,
  'Recipe list': _RecipeList.default
};

const updateWpAdminBarEditButtonWithId = pageId => {
  const wrapEl = document.getElementById('wp-admin-bar-edit');

  if (!wrapEl) {
    return;
  }

  const linkEl = wrapEl.getElementsByTagName('a')[0];
  const editUrl = linkEl.href;
  const editRegex = /(.*)(post=)(\d+)(.*)/;

  if (editUrl.match(editRegex)) {
    const updatedEditUrl = editUrl.replace(editRegex, `$1$2${pageId}$4`);
    linkEl.href = updatedEditUrl;
    (0, _utils.debug)('App> updateWpAdminBarEditButtonWithId() - updating edit button id to: ', pageId);
  }
};

const LocationSwitch = (0, _reactRouterDom.withRouter)(props => {
  const store = (0, _store.useStore)();
  const {
    children
  } = props;
  const prevProps = (0, _hooks.usePrevious)(props); // check whether user has navigated or whether this is the initial load without a hydrated store 
  // if yes, set location to changed in order to trigger page data & initial props load 
  // for route (see renderRoute()) 

  if (prevProps && prevProps.location.pathname !== props.location.pathname || !prevProps && !store.serverSideBootstrapped) {
    (0, _utils.debug)('LocationSwitch> setting location changed state to: ', true);
    store.setLocationChanged(true);
  } else {
    (0, _utils.debug)('LocationSwitch> setting location changed state to: ', false);
    (0, _utils.debug)('LocationSwitch> was ssr bootstrapped: ', store.serverSideBootstrapped);
    store.setLocationChanged(false);
  }

  return _react.default.createElement(_reactRouterDom.Switch, null, children);
});
const App = (0, _mobxReactLite.observer)(({
  ssr = false
}, ref) => {
  let store = (0, _store.useStore)(); // trigger a rerender when these props are changed

  store.loadingPageAndProps;
  store.pageData;
  store.pageInitialProps;

  if (store.state === store.states.loading) {
    return _react.default.createElement("div", null, "Loading...");
  }

  if (store.state === store.states.error) {
    return _react.default.createElement("div", null, _react.default.createElement("h3", null, "An error occured:"), _react.default.createElement("code", null, store.getError()));
  }

  const renderRoute = (props, route) => {
    (0, _utils.debug)('App> renderRoute() called');
    (0, _utils.debug)('App> has location changed?', store.locationChanged);
    let PageComponent = pageComponents[route.component];

    if (!(0, _utils.defined)(PageComponent)) {
      const message = `Could not render page - no React component mapped to name "${route.component}" found!`;
      console.error(`App> Could not render page - no React component mapped to name "${route.component}" found!`);

      PageComponent = () => _react.default.createElement(_Error.default, {
        code: "501",
        message: message
      });
    } // expose promises in ref (enables us to wait for 
    // data load when doing ssr, see server/lib/ssr/index.js).


    if (ref && (0, _utils.defined)(ref.current) && ref.current === null) {
      // ssr
      (0, _utils.debug)('App> renderRoute is triggering SSR data & props load procedure - will not render this run');
      ref.current = {
        contentPromise: store.loadContentAndInitialProps(route.id, route.postType, PageComponent.getInitialProps)
      }; // don't render anything here, just trigger the promise 
      // the ssr renderer will trigger a new render when the promise is resolved

      return null;
    } else if (!ssr && store.locationChanged) {
      // client 
      (0, _utils.debug)('App> renderRoute is triggering CLIENT data & props load procedure');
      store.loadContentAndInitialProps(route.id, route.postType, PageComponent.getInitialProps);
      updateWpAdminBarEditButtonWithId(route.id);
    }

    (0, _utils.debug)('App> current loaded pageData: ', store.pageData);
    return _react.default.createElement(PageComponent, _extends({
      id: route.id,
      type: route.postType,
      url: route.url,
      loading: store.loadingPageAndProps,
      pageData: store.pageData,
      initialProps: store.pageInitialProps
    }, props));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Header.default, null), _react.default.createElement(LocationSwitch, {
    ssr: ssr
  }, store.routes.map(route => _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    key: route.url,
    path: route.url,
    render: props => renderRoute(props, route)
  })), _react.default.createElement(_reactRouterDom.Route, {
    component: _NotFound.default
  })));
}, {
  forwardRef: true
});
var _default = App;
exports.default = _default;
},{"./store":"28Kg","./hooks":"k74t","./layout/Header":"ZlR1","./pages/NotFound":"e6rX","./pages/Error":"ARH/","./pages/Start":"gTCO","./pages/Page":"vry0","./pages/Post":"Dk/9","./pages/Recipe":"FRwr","./pages/RecipeList":"VrZy","./utils":"mbFY"}],"TbCL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _mobxReactLite = require("mobx-react-lite");

var _reactHelmetAsync = require("react-helmet-async");

var _reactRouterDom = require("react-router-dom");

var _store = require("../../../app/store");

var _App = _interopRequireDefault(require("../../../app/App"));

var _utils = require("../../../app/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(0, _mobxReactLite.useStaticRendering)(true);

const ssrRenderer = async (req, res) => {
  let appRef = (0, _react.createRef)(null);
  const context = {};
  const helmetContext = {};
  const store = new _store.Store();
  (0, _utils.debug)('SSR renderer: calling store bootstrap!');
  await store.bootstrap();

  const component = _react.default.createElement(_store.StoreProvider, {
    store: store
  }, _react.default.createElement(_reactHelmetAsync.HelmetProvider, {
    context: helmetContext
  }, _react.default.createElement(_reactRouterDom.StaticRouter, {
    location: req.originalUrl,
    context: context
  }, _react.default.createElement(_App.default, {
    ssr: true,
    ref: appRef
  })))); // render once to trigger router & content data load, then await 
  // data load promise exposed by the <App> ref & re-render with loaded data.


  let app = '';

  _server.default.renderToString(component);

  if (appRef.current && appRef.current.contentPromise) {
    (0, _utils.debug)('SSR Renderer: waiting for content promise!');
    await appRef.current.contentPromise;
    (0, _utils.debug)('SSR Renderer: content promise resolved!');
    app = _server.default.renderToString(component);
  }

  store.setServerSideBootstrapped(true);
  const html = `
        <div id="root">${app}</div>
        <script>
            window.__FROJD_STATE = '${(0, _store.dehydrate)(store)}';
        </script>
    `;

  if (context.url) {
    (0, _utils.debug)('SSR renderer: 301 redirect!');
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    (0, _utils.debug)('SSR renderer: responding with rendered html!');
    res.send(html);
  }
};

var _default = ssrRenderer;
exports.default = _default;
},{"../../../app/store":"28Kg","../../../app/App":"ISOy","../../../app/utils":"mbFY"}],"Focm":[function(require,module,exports) {
"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _llog = _interopRequireDefault(require("llog"));

var _ssr = _interopRequireDefault(require("./lib/ssr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 1234;
const server = (0, _express.default)();
const serveStatic = _express.default.static;
server.use('/dist/client', serveStatic(_path.default.resolve(process.cwd(), '__dist', 'client')));
server.get('/*', _ssr.default);
server.listen(port, () => {
  _llog.default.info(`Listening on port ${port} - have fun!`);
});
},{"./lib/ssr":"TbCL"}]},{},["Focm"], null)
//# sourceMappingURL=/dist/index.js.map