class Circle extends Shape {
    constructor(color = 'red') {
        super(color);
        this.drawShape(this.canvas.width, this.canvas.height)
    }
    drawShape(width, height) {
        this.drawingContext = this.canvas.getContext('2d');
        this.drawingContext.beginPath();
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.lineWidth = 3;
        this.drawingContext.beginPath();
        this.drawingContext.arc(width / 2, height / 2, width >= height ? height / 2 - 1 : width / 2 - 1, 0, 2 * Math.PI);
        this.drawingContext.stroke();
    }
    isRightPosition(isOffset, cursorX, cursorY) {
        let { x, y } = this.adaptCoords(isOffset, cursorX + 3, cursorY + 3);
        let radiusLengthX = Math.sqrt((this.selfElement.offsetWidth / 2) ** 2);
        let radiusLengthY = Math.sqrt((this.selfElement.offsetHeight / 2) ** 2);
        let length = Math.sqrt((x - this.selfElement.offsetWidth / 2) ** 2 + (y - this.selfElement.offsetHeight / 2) ** 2);
        if (Math.abs(length - radiusLengthX) < 5 || Math.abs(length - radiusLengthY) < 5) return true;
        if (Math.abs(x - this.getSize().width) <= 7 && Math.abs(y - this.getSize().height) <= 7) return true;
        return false;
    }
}