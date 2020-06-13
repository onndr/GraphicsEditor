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
    isRightPosition(cursorX, cursorY) {
        let k = this.selfElement.offsetHeight / this.selfElement.offsetWidth;
        if (cursorX * k >= cursorY - 7 && cursorX * k <= cursorY + 7) {
            return true;
        } else return false;
    }
}