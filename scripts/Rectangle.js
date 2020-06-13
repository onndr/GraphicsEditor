class Rectangle extends Shape {
    constructor(color = 'red') {
        super(color);
        this.drawShape(this.canvas.width, this.canvas.height);
    }
    isRightPosition(cursorX, cursorY) {
        if (Math.abs(cursorX) <= 5 && cursorY) return true;
        if (Math.abs(cursorY) <= 5 && cursorX) return true;
        if (Math.abs(cursorX - this.selfElement.offsetWidth) <= 5 && Math.abs(cursorY)) return true;
        if (Math.abs(cursorY - this.selfElement.offsetHeight) <= 5 && Math.abs(cursorY)) return true;
        return false;
    }
    drawShape(width, height){
        this.drawingContext = this.canvas.getContext('2d');
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.lineWidth = 5;
        this.drawingContext.strokeRect(0, 0, width, height);
    }
}