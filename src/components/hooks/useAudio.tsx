import { useMemo, useEffect, useState } from "react";

const useAudio = (url: string) => {
    const audio = useMemo(() => new Audio(url), [url]);
    audio.loop = true;
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing, audio]);

    useEffect(() => {
        audio.addEventListener("ended", () => setPlaying(false));
        return () => {
            audio.removeEventListener("ended", () => setPlaying(false));
        };
    }, [audio]);

    return { playing, toggle };
};

export default useAudio;
