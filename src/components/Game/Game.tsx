import { useRef, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import useMouseCoords from "../hooks/useMouseCoords";
import useWindowResize from "../hooks/useWidnowsResize";
import {
    addToGunsArray,
    handleCollision,
    handleParticle,
} from "../../utils/gamesFuncs";
import Spaceship from "../Spaceship/Spaceship";
import Particle from "./Particle/Particle";
import Wait from "./Wait/Wait";
import useAudio from "../hooks/useAudio";
import { DarkThemeContext } from "../context/DarkTheme/DarkTheme";

function Game() {
    const { width, height } = useWindowResize();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameOver, setGameOver] = useState(true);
    const { dark } = useContext<any>(DarkThemeContext);
    const [ship, setShip] = useState(
        "https://www.svgrepo.com/show/217223/spacecraft.svg"
    );
    const { mCoords } = useMouseCoords();
    const { toggle } = useAudio(
        "https://vgmsite.com/soundtracks/taito-1500-box-scitron-5th-anniversary/bwiuqsbe/102-bgm%201%20halley.mp3"
    );
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

    function updateMouseCoords(e: MouseEvent) {
        mouseCoords.current.x = e.x;
        mouseCoords.current.y = e.y;
    }

    useEffect(() => {
        let renderId: any;
        let currRef = canvasRef.current;
        if (!gameOver) {
            if (!currRef) return;
            const cnv = currRef.getContext("2d");
            currRef.addEventListener("mousemove", updateMouseCoords);
            const render = (timeStamp: number) => {
                if (!cnv || !currRef) return;

                cnv.clearRect(0, 0, currRef.width, currRef.height);
                cnv.fillStyle = "#fff";
                cnv.font = "50px serif";
                cnv.fillText(`Score: ${score.current}`, 20, 50);
                let deltaTime = timeStamp - lastTime.current;
                lastTime.current = timeStamp;
                timeToNextRect.current += deltaTime;

                //if the time amount pass create new target
                if (timeToNextRect.current > rectInterval.current) {
                    particleArray.current.push(new Particle(currRef));
                    timeToNextRect.current = 0;
                }
                //creates player spaceship
                const spaceship = new Spaceship(mouseCoords.current, ship);
                spaceship.draw(cnv);

                //draws target to canvas
                [...particleArray.current].forEach((particle) =>
                    particle.draw(cnv)
                );

                //update targets to move
                [...particleArray.current].forEach((particle) => {
                    particle.update(currRef, setGameOver);
                });
                //removes any targets from canvas that have been destroyed
                particleArray.current = particleArray.current.filter(
                    (particle) => !particle.remove
                );
                //draws gun particle for each item in the arrays
                [...gunsArray.current].forEach((particle) => {
                    particle.draw(cnv);
                });
                [...gunsArray.current].forEach((particle) => particle.update());

                //removes gunsParticle from the array
                gunsArray.current = gunsArray.current.filter(
                    (particle) => !particle.remove
                );
                //checks if particles in guns array and targets particle collide
                //if they do remove both of them from their arry
                if (gunsArray && particleArray) {
                    particleArray.current = particleArray.current.sort(
                        (a, b) => a.x! - b.x!
                    );
                    const currScore = handleParticle(
                        particleArray.current,
                        gunsArray.current
                    );

                    if (currScore) {
                        score.current += currScore;
                    }
                }
                // if spaceship hits target game is over
                if (particleArray) {
                    particleArray.current = particleArray.current.sort(
                        (a, b) => a.x! - b.x!
                    );
                    //restarts the game
                    handleCollision(
                        particleArray.current,
                        mouseCoords.current,
                        setGameOver
                    );
                }

                renderId = requestAnimationFrame(render);
            };
            render(0);
        }
        return () => {
            cancelAnimationFrame(renderId);
            if (!currRef) return;
            currRef.removeEventListener("mousemove", updateMouseCoords);
        };
    }, [gameOver]);

    return (
        <div>
            <canvas
                onClick={() => {
                    gunsArray.current.push(
                        addToGunsArray(
                            mouseCoords.current,
                            dark === "dark" ? "white" : "black"
                        )
                    );
                }}
                className={`${!gameOver ? `cursor-none` : "cursor-auto"}`}
                ref={canvasRef}
                width={width}
                height={height}
            />
            {gameOver && (
                <Wait
                    delay={3}
                    ui={
                        <div className="absolute flex items-center justify-center w-screen h-screen p-10 text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 bg-black/40 top-1/2 left-1/2 rounded-2xl">
                            <motion.button
                                className="p-10 text-4xl font-bold text-green-600 capitalize border-8 border-green-600 shadow-2xl hover:border-green-500 hover:text-green-500 bg-white/20 top-1/2 left-1/2 rounded-2xl"
                                onClick={() => {
                                    gunsArray.current = [];
                                    particleArray.current = [];
                                    mouseCoords.current = mCoords;
                                    score.current = 0;
                                    setGameOver(false);
                                }}
                            >
                                start game
                            </motion.button>
                            <motion.button
                                className="p-10 text-4xl font-bold text-green-600 capitalize border-8 border-green-600 shadow-2xl hover:border-green-500 hover:text-green-500 bg-white/20 top-1/2 left-1/2 rounded-2xl"
                                onClick={() => {
                                    toggle();
                                }}
                            >
                                toggle music
                            </motion.button>
                        </div>
                    }
                />
            )}
        </div>
    );
}

export default Game;
