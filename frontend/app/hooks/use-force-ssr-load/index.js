import { useState } from 'react';
import queryString from 'query-string';

import { useStore } from '../../store';
import { 
    debug,
    runningInBrowser
} from '../../utils';

function useForceSsrLoad() {
    const store = useStore(); 
    const [didReload, setDidReload] = useState(false);

    if (runningInBrowser() && store.serverSideBootstrapped) {
        const { r } = queryString.parse(window.location.search);
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
