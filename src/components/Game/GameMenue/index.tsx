import { Dispatch, MutableRefObject, SetStateAction, useContext } from "react";
import { motion } from "framer-motion";
import useMouseCoords from "../../hooks/useMouseCoords";
import useWindowResize from "../../hooks/useWidnowsResize";
import { GameContext } from "../../context/GameContext";
import { UserContext } from "../../context/UserContext/UserProvider";

type Props = {
    gunsArray: MutableRefObject<any[]>;
    particleArray: MutableRefObject<any[]>;
    mouseCoords: MutableRefObject<{ x: number; y: number }>;
    score: MutableRefObject<number>;
    setGameOver: Dispatch<SetStateAction<boolean>>;
    setCurrScore: Dispatch<SetStateAction<number>>;
};

const Modal = () => {
    const { handleGameStart, score } = useContext(GameContext);
    const { user } = useContext(UserContext);

    return (
        <div className="absolute flex items-center justify-center p-10 text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-2xl">
            <motion.button
                className="p-10 text-4xl font-bold text-yellow-300 capitalize border-8 border-yellow-300 shadow-2xl hover:border-yellow-200 hover:text-yellow-200 bg-white/20 top-1/2 left-1/2 rounded-2xl"
                onClick={handleGameStart}
            >
                {score.current > 0 ? "Try again" : "Start new game"}
            </motion.button>
        </div>
    );
};

export default Modal;
