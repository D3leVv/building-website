import {
    createContext,
    useRef,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";
import useMouseCoords from "../../hooks/useMouseCoords";
import useWindowResize from "../../hooks/useWidnowsResize";

type Context = {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    gameOver: boolean;
    setGameOver: Dispatch<SetStateAction<boolean>>;
    setCurrScore: Dispatch<SetStateAction<number>>;
    ship: string;
    currScore: number;
    mCoords: {
        x: number;
        y: number;
    };
    mouseCoords: React.MutableRefObject<{
        x: number;
        y: number;
    }>;
    score: React.MutableRefObject<number>;
    particleArray: React.MutableRefObject<any[]>;
    gunsArray: React.MutableRefObject<any[]>;
    timeToNextRect: React.MutableRefObject<number>;
    rectInterval: React.MutableRefObject<number>;
    lastTime: React.MutableRefObject<number>;
    updateMouseCoords: (e: MouseEvent) => void;
    handleGameOver: (val: boolean) => void;
    width: number;
    height: number;
    escKey: boolean;
    setEscKey: Dispatch<SetStateAction<boolean>>;
};

export const GameContext = createContext({} as Context);

const GameProvider = ({ children }: { children: ReactNode }) => {
    const { width, height, escKey, setEscKey } = useWindowResize();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameOver, setGameOver] = useState(false);
    const [ship, setShip] = useState(
        "https://www.svgrepo.com/show/217223/spacecraft.svg"
    );
    const [currScore, setCurrScore] = useState(0);
    const { mCoords } = useMouseCoords();
    const mouseCoords = useRef({
        x: 0,
        y: 0,
    });
    const score = useRef<number>(0);
    const particleArray = useRef<any[]>([]);
    const gunsArray = useRef<any[]>([]);
    const timeToNextRect = useRef<number>(0);
    const rectInterval = useRef<number>(500);
    const lastTime = useRef<number>(0);

    const updateMouseCoords = (e: MouseEvent) => {
        mouseCoords.current.x = e.x;
        mouseCoords.current.y = e.y;
    };

    const handleGameOver = (val: boolean) => {
        setCurrScore(score.current);
        setEscKey(false);
        setGameOver(val);
    };

    return (
        <GameContext.Provider
            value={{
                canvasRef,
                gameOver,
                setGameOver,
                setCurrScore,
                ship,
                currScore,
                mCoords,
                mouseCoords,
                score,
                particleArray,
                gunsArray,
                timeToNextRect,
                rectInterval,
                lastTime,
                updateMouseCoords,
                handleGameOver,
                width,
                height,
                escKey,
                setEscKey,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
