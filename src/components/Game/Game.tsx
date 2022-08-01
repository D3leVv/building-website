import { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import useWindowResize from "../hooks/useWidnowsResize";
import {
    addToGunsArray,
    handleCollision,
    handleParticle,
} from "../../utils/gamesFuncs";
import Spaceship from "./Spaceship/Spaceship";
import Particle from "./Particle/Particle";
import { DarkThemeContext } from "../context/DarkTheme/DarkTheme";
import { GameContext } from "../context/GameContext";

function Game() {
    const { dark } = useContext<any>(DarkThemeContext);
    const game = useContext<any>(GameContext);

    useEffect(() => {
        let renderId: any;
        let currRef = game.canvasRef.current;
        if (!game.gameOver) {
            if (!currRef) return;
            const cnv = currRef.getContext("2d");
            currRef.addEventListener("mousemove", game.updateMouseCoords);
            const render = (timeStamp: number) => {
                if (!cnv || !currRef) return;
                if (game.escKey) return;
                cnv.clearRect(0, 0, currRef.width, currRef.height);
                cnv.fillStyle = "#fff";
                cnv.font = "50px serif";
                cnv.fillText(`Score: ${game.score.current}`, 20, 50);
                let deltaTime = timeStamp - game.lastTime.current - 10;
                game.lastTime.current = timeStamp;
                game.timeToNextRect.current += deltaTime;

                //if the time amount pass create new target
                if (game.timeToNextRect.current > game.rectInterval.current) {
                    game.particleArray.current.push(new Particle(currRef));
                    game.timeToNextRect.current = 0;
                }
                //creates player spaceship
                const spaceship = new Spaceship(
                    game.mouseCoords.current,
                    game.ship
                );
                spaceship.draw(cnv);

                //draws target to canvas
                [...game.particleArray.current].forEach((particle) =>
                    particle.draw(cnv)
                );

                //update targets to move
                [...game.particleArray.current].forEach((particle) => {
                    particle.update(currRef, game.setGameOver);
                });
                //removes any targets from canvas that have been destroyed
                game.particleArray.current = game.particleArray.current.filter(
                    (particle: any) => !particle.remove
                );
                //draws gun particle for each item in the arrays
                [...game.gunsArray.current].forEach((particle) => {
                    particle.draw(cnv);
                });
                [...game.gunsArray.current].forEach((particle) =>
                    particle.update()
                );

                //removes gunsParticle from the array
                game.gunsArray.current = game.gunsArray.current.filter(
                    (particle: any) => !particle.remove
                );
                //checks if particles in guns array and targets particle collide
                //if they do remove both of them from their arry
                if (game.gunsArray && game.particleArray) {
                    game.particleArray.current =
                        game.particleArray.current.sort(
                            (a: any, b: any) => a.x! - b.x!
                        );
                    const currScore = handleParticle(
                        game.particleArray.current,
                        game.gunsArray.current
                    );

                    if (currScore) {
                        game.score.current += currScore;
                    }
                }
                // if spaceship hits target game is over
                if (game.particleArray) {
                    game.particleArray.current =
                        game.particleArray.current.sort(
                            (a: any, b: any) => a.x! - b.x!
                        );
                    //restarts the game
                    handleCollision(
                        game.particleArray.current,
                        game.mouseCoords.current,
                        game.handleGameOver
                    );
                }

                // console.log(keyPress);
                renderId = requestAnimationFrame(render);
            };
            render(0);
        }
        return () => {
            cancelAnimationFrame(renderId);
            if (!currRef) return;
            currRef.removeEventListener("mousemove", game.updateMouseCoords);
        };
    }, [game.escKey, game.gameOver, game.canvasRef]);

    return (
        <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <canvas
                onClick={() => {
                    game.gunsArray.current.push(
                        addToGunsArray(
                            game.mouseCoords.current,
                            dark === "dark" ? "white" : "black"
                        )
                    );
                }}
                className={`${
                    !game.gameOver ? `cursor-none` : "cursor-auto"
                } overflow-hidden `}
                ref={game.canvasRef}
                width={game.width}
                height={game.height - 75}
            />
            {(game.gameOver || game.escKey) && (
                <div className="absolute flex items-center justify-center w-full h-full p-10 text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-2xl">
                    <motion.button
                        className="p-10 text-4xl font-bold text-yellow-300 capitalize border-8 border-yellow-300 shadow-2xl hover:border-yellow-200 hover:text-yellow-200 bg-white/20 top-1/2 left-1/2 rounded-2xl"
                        onClick={() => {
                            game.gunsArray.current = [];
                            game.particleArray.current = [];
                            game.mouseCoords.current = game.mCoords;
                            game.score.current = 0;
                            game.setGameOver(false);
                            game.setCurrScore(game.score.current);
                            game.setEscKey(false);
                        }}
                    >
                        start game
                    </motion.button>
                </div>
            )}
        </div>
    );
}

export default Game;
