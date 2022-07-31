import { useEffect, useCallback, useState } from "react";

function useWindowResize() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [escKey, setEscKey] = useState(false);

    const handleWidthChange = useCallback(() => {
        return setWidth(window.innerWidth);
    }, []);

    const handleHeightChange = useCallback(() => {
        return setHeight(window.innerHeight);
    }, []);
    const handleEscapeKeyPress = useCallback((e: any) => {
        if (e.key === "Escape") setEscKey((prev) => !prev);
    }, []);

    useEffect(() => {
        handleWidthChange();
        handleHeightChange();

        window.addEventListener("resize", handleWidthChange);
        window.addEventListener("resize", handleHeightChange);
        document.addEventListener("keydown", handleEscapeKeyPress);
        return () => {
            window.removeEventListener("resize", handleHeightChange);
            window.removeEventListener("resize", handleWidthChange);
            document.removeEventListener("keydown", handleEscapeKeyPress);
        };
    }, [handleHeightChange, handleWidthChange]);

    return {
        height,
        width,
        escKey,
    };
}

export default useWindowResize;
