class Triangle extends Shape {
    constructor(kind, color = 'red') {
        super(color);
        this.kind = kind;
        this.drawShape(this.canvas.width, this.canvas.height);
    }
    drawShape(width, height){
        this.drawingContext = this.canvas.getContext('2d');
        this.drawingContext.beginPath();
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.lineWidth = 3;
        if (this.kind === 'isosceles') {
            this.drawingContext.moveTo(width/2, 1);
            this.drawingContext.lineTo(width-1, height-1);
            this.drawingContext.lineTo(1, height-1);
            this.drawingContext.lineTo(width/2, 1);
        } else if (this.kind === 'right') {
            this.drawingContext.moveTo(1, 1);
            this.drawingContext.lineTo(width-1, height-1);
            this.drawingContext.lineTo(1, height-1);
            this.drawingContext.lineTo(1, 1);
        }
        this.drawingContext.stroke();
    }
    isRightPosition(cursorX, cursorY) {
        if (Math.abs(cursorY - this.selfElement.offsetHeight) <= 7 && cursorX) return true;
        if (this.kind === 'isosceles') {
            let k = this.selfElement.offsetHeight / (this.selfElement.offsetWidth / 2);
            if (cursorX >= this.selfElement.offsetWidth / 2 &&
                Math.abs((cursorX - this.selfElement.offsetWidth / 2) * k - cursorY) <= 10) return true;

            if (cursorX <= this.selfElement.offsetWidth / 2 &&
                Math.abs(cursorX * k - (this.selfElement.offsetHeight - cursorY)) <= 10) return true;
        } else if (this.kind === 'right') {
            let k = this.selfElement.offsetHeight / this.selfElement.offsetWidth;
            if (cursorX <= 7 && cursorY) return true;

            if (cursorX * k >= cursorY - 7 && cursorX * k <= cursorY + 7) return true;
        }
        return false;
    }
}