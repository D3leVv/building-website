class Gun {
    x: number;
    y: number;
    remove: boolean;
    color: string;
    constructor(obj: { x: number; y: number }, color: string) {
        this.x = obj.x + 2;
        this.y = obj.y;
        this.remove = false;
        this.color = color;
    }
    update() {
        this.y -= 10;
        if (this.y <= 0) {
            this.remove = true;
        }
    }
    draw(cnv: CanvasRenderingContext2D) {
        cnv.fillStyle = this.color;
        cnv.fillRect(this.x, this.y, 5, 5);
    }
}

export default Gun;
