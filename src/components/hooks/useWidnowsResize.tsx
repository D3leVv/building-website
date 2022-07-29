import { useEffect, useCallback, useState } from "react";

function useWindowResize() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWidthChange = useCallback(() => {
        return setWidth(window.innerWidth);
    }, []);

    const handleHeightChange = useCallback(() => {
        return setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        handleWidthChange();
        handleHeightChange();
        window.addEventListener("resize", handleWidthChange, { passive: true });
        window.addEventListener("resize", handleHeightChange, {
            passive: true,
        });
        return () => {
            window.removeEventListener("resize", handleHeightChange);
            window.removeEventListener("resize", handleWidthChange);
        };
    }, [handleHeightChange, handleWidthChange]);

    return {
        height,
        width,
    };
}

export default useWindowResize;
