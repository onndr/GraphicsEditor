class Rectangle extends Shape {
    constructor(color = 'red') {
        super(color);
        this.drawShape(this.canvas.width, this.canvas.height);
    }
    isRightPosition(isOffset, cursorX, cursorY) {
        let { x, y } = this.adaptCoords(isOffset, cursorX, cursorY);
        if (Math.abs(x) <= 5 && y) return true;
        if (Math.abs(y) <= 5 && x) return true;
        if (Math.abs(x - this.selfElement.offsetWidth) <= 5 && Math.abs(y)) return true;
        if (Math.abs(y - this.selfElement.offsetHeight) <= 5 && Math.abs(y)) return true;
        return false;
    }
    drawShape(width, height) {
        this.drawingContext = this.canvas.getContext('2d');
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.lineWidth = 5;
        this.drawingContext.strokeRect(0, 0, width, height);
    }
}