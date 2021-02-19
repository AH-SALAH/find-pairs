import { useCallback, useEffect, useRef } from "react";

// check if comp is mounted
const useIsMounted = () => {
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;

        return () => isMountedRef.current = false;
    }, []);

    return useCallback(
        () => isMountedRef.current,
        [])
};

export default useIsMounted;