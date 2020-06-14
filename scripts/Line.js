class Line extends Shape {
    constructor(color = 'red') {
        super(color);
        this.drawShape(this.canvas.width, this.canvas.height);
    }
    drawShape(width, height){
        this.drawingContext = this.canvas.getContext('2d');
        this.drawingContext.beginPath();
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.lineWidth = 3;
        this.drawingContext.moveTo(0, 0);
        this.drawingContext.lineTo(width, height);
        this.drawingContext.stroke();
    }
    isRightPosition(isOffset, cursorX, cursorY) {
        let {x, y} = this.adaptCoords(isOffset, cursorX, cursorY);
        let k = this.selfElement.offsetHeight / this.selfElement.offsetWidth;
        if (x * k >= y - 7 && x * k <= y + 7) {
            return true;
        } else return false;
    }
}