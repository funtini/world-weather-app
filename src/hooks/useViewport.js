import {useState, useEffect, useCallback} from 'react';

import { VIEWPORT_BREAKPOINTS } from '../utils';

/**
 * Hook for manage viewport size and return a boolean for each breakpoint
 * For now, we just need mobile flag
 *
 * @returns {{isMobile: boolean}}
 */
const useViewport = () => {
    const hasWindow = typeof window !== 'undefined';

    const getViewportWidth = useCallback(() => hasWindow ? window.innerWidth : null, [hasWindow]);

    const [viewportWidth, setViewportWidth] = useState(getViewportWidth());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setViewportWidth(getViewportWidth());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow, getViewportWidth]);

    return {
        isMobile: viewportWidth <= VIEWPORT_BREAKPOINTS.small,
    };
}

export default useViewport;