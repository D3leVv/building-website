import { useCallback, useState, useEffect } from "react";

function useMouseCoords() {
    const [mCoords, setMCoords] = useState({ x: 0, y: 0 });

    const handleMouseCoords = useCallback((e: MouseEvent) => {
        return setMCoords({ x: e.x, y: e.y });
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseCoords);

        return () => {
            document.removeEventListener("mousemove", handleMouseCoords);
        };
    }, [handleMouseCoords]);

    return { mCoords };
}

export default useMouseCoords;
