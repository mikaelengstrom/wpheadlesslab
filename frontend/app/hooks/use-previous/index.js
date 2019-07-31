import { 
    useRef,
    useEffect
 } from 'react';

// compare current & prev. props 
function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious; 