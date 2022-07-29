import { Dispatch, SetStateAction } from "react";

class Particle {
    x: number;
    y: number;
    width: number;
    remove: boolean;
    image: HTMLImageElement;
    img?: string;
    constructor(canvas: HTMLCanvasElement, img?: string) {
        this.x = Math.floor(Math.random() * (canvas.width - 100));
        this.y = 0;
        this.width = Math.floor(Math.random() * 50 + 25);
        // this.moveX = Math.random();
        // this.moveY = Math.random();
        // this.size = this.width * this.width;
        this.img = img;
        this.remove = false;
        this.image = new Image();
        this.image.src = this.img
            ? this.img
            : "https://softuni.bg/content/images/svg-logos/software-university-mobile-logo.svg";
    }
    update(
        canvas: HTMLCanvasElement,
        setGameOver: Dispatch<SetStateAction<boolean>>
    ) {
        this.y += 1.2;
        if (this.y > canvas.height) {
            this.remove = true;
            setGameOver(true);
        }
    }
    draw(cnv: CanvasRenderingContext2D) {
        cnv.drawImage(this.image, this.x, this.y, this.width, this.width);
    }
}
export default Particle;
