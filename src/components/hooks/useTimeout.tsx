import { useState, useEffect } from "react";

export default function useTimeout(delay: number) {
    const [timeLeft, setTimeLeft] = useState(delay);

    useEffect(() => {
        // exit early when we reach 0
        // if (!timeLeft) {
        //     // setTimeLeft(delay);
        //     return setShow(true);
        // }

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, delay * 500);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft, delay]);

    return { timeLeft };
}
