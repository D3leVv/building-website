import { Dispatch, SetStateAction } from "react";
import Gun from "../components/Game/Gun/Gun";

export const handleParticle = (arr1: any[], arr2: any[]) => {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            const dx = arr1[i].x - arr2[j].x;
            const dy = arr1[i].y - arr2[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                arr1[i].remove = true;
                arr2[j].remove = true;
                return 1;
            }
        }
    }
};
export const handleCollision = (
    arr1: any[],
    mouseCoords: { x: number; y: number },
    setGameOverHandler: (val: boolean) => void
) => {
    for (let i = 0; i < arr1.length; i++) {
        const dx = arr1[i].x - mouseCoords.x;
        const dy = arr1[i].y - mouseCoords.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 50) {
            return setGameOverHandler(true);
        }
    }
};

export function addToGunsArray(
    mouseCoords: { x: number; y: number },
    color: string
) {
    return new Gun(mouseCoords, color);
}

export const handleSpaceshipMove = (kurrKey: string[]) => {
    window.addEventListener("keydown", (e) => {
        if (
            e.key === "ArrowUp" ||
            e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight"
        ) {
            if (!kurrKey.includes(e.key)) {
                kurrKey.push(e.key);
            }
        }
    });
    window.addEventListener("keyup", (e) => {
        if (
            e.key === "ArrowUp" ||
            e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight"
        ) {
            if (kurrKey.includes(e.key)) {
                kurrKey.splice(kurrKey.indexOf(e.key), 1);
            }
        }
    });
    return kurrKey;
};
