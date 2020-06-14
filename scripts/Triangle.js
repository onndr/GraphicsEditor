class Triangle extends Shape {
    constructor(kind, color = 'red') {
        super(color);
        this.kind = kind;
        this.drawShape(this.canvas.width, this.canvas.height);
    }
    drawShape(width, height) {
        this.drawingContext = this.canvas.getContext('2d');
        this.drawingContext.beginPath();
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.lineWidth = 3;
        if (this.kind === 'isosceles') {
            this.drawingContext.moveTo(width / 2, 1);
            this.drawingContext.lineTo(width - 1, height - 1);
            this.drawingContext.lineTo(1, height - 1);
            this.drawingContext.lineTo(width / 2, 1);
        } else if (this.kind === 'right') {
            this.drawingContext.moveTo(1, 1);
            this.drawingContext.lineTo(width - 1, height - 1);
            this.drawingContext.lineTo(1, height - 1);
            this.drawingContext.lineTo(1, 1);
        }
        this.drawingContext.stroke();
    }
    isRightPosition(isOffset, cursorX, cursorY) {
        let { x, y } = this.adaptCoords(isOffset, cursorX, cursorY);
        if (Math.abs(y - this.selfElement.offsetHeight) <= 7 && x) return true;
        if (this.kind === 'isosceles') {
            let k = this.selfElement.offsetHeight / (this.selfElement.offsetWidth / 2);
            if (x >= this.selfElement.offsetWidth / 2 &&
                Math.abs((x - this.selfElement.offsetWidth / 2) * k - y) <= 10) return true;

            if (x <= this.selfElement.offsetWidth / 2 &&
                Math.abs(x * k - (this.selfElement.offsetHeight - y)) <= 10) return true;
        } else if (this.kind === 'right') {
            let k = this.selfElement.offsetHeight / this.selfElement.offsetWidth;
            if (x <= 7 && y) return true;

            if (x * k >= y - 7 && x * k <= y + 7) return true;
        }
        return false;
    }
}