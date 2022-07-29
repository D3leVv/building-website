class Spaceship {
    x: number;
    y: number;
    width: number;
    image: HTMLImageElement;
    constructor(obj: { x: number; y: number }, url: string) {
        this.x = obj.x;
        this.y = obj.y;
        this.width = 100;
        this.image = new Image();

        this.image.src = url;
    }

    draw(cnv: CanvasRenderingContext2D) {
        cnv.drawImage(this.image, this.x - 45, this.y, this.width, this.width);
    }
}

export default Spaceship;
