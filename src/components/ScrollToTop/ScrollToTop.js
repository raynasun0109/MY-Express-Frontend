import {useEffect} from 'react';

function ScrollToTopOnMount() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.scrollTo) {
            window.scrollTo(0, 0);
        }
    }, []);

    return null;
}

export default ScrollToTopOnMount;