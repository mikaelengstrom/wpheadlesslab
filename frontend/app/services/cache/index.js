import { debug } from '../../utils';

const defaultTtl = 10 * 1000;
let currentTtl = defaultTtl; 

let entries = {}; 

const now = () => 
    new Date().getTime(); 

const setTtl = (ttl) => {
    debug(`Cache: setting cache ttl to ${ttl}ms`);
    currentTtl = ttl; 
}

const remove = (key) =>
    entries = Object.keys(entries)
        .reduce((obj, k) => {
            if (k !== key) {
                obj[k] = entries[k]
            }

            return obj;
        }, {}); 

const hasKey = (key) => {
    if(!(key in entries)) {
        return false; 
    }

    const entry = entries[key];

    if (now() - entry.timestamp > currentTtl) {
        debug(`Cache: entry with key "${key}" has expired`);
        remove(key);

        return false;
    }

    return true; 
}

const set = (key, value) => 
    entries = {
        ...entries, 
        [key]: {
            value, 
            timestamp: now()
        }
    };

const get = (key) => {
    if (!(key in entries)) {
        return null;
    }

    const entry = entries[key];

    if (now() - entry.timestamp > currentTtl) {
        debug(`Cache: entry with key "${key}" has expired`);
        remove(key);
        return null; 
    }

    debug(`Cache: found entry with key "${key}", time left: `, now() - entry.timestamp);

    return entry.value; 
};

export {
    setTtl, 
    hasKey, 
    set, 
    remove,
    get
}