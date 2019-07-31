import { useState } from 'react';
import queryString from 'query-string';

import { useStore } from '../../store';
import { debug } from '../../utils';

function useForceSsrLoad() {
    const store = useStore(); 
    const [didReload, setDidReload] = useState(false);

    if (process.env.BABEL_ENV === 'client' && store.serverSideBootstrapped) {
        const { r } = queryString.parse(location.search);

        if(!r && !didReload && store.locationChanged) {
            debug('useForceSsrLoad() hook: page not yet reloaded - reloading!');
            setDidReload(true);
            window.location = `${window.location}?r=true`; 

            return true; 
        }

        if (!r && didReload) {
            return true; 
        }
    }

    debug('useForceSsrLoad() hook: NOT reloading!');
    return false; 
}


export default useForceSsrLoad; 
