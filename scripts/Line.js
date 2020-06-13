class Line extends GraphicObject {
    constructor(color = 'red') {
        super();
        this.color = color;
        this.createSelf();
    }
    createSelf = () => {
        this.selfElement = document.createElement('div');
        this.selfElement.className = 'wrapperDiv';
        let canvas = document.createElement('canvas');
        canvas.className = 'wrappedImage';
        canvas.width = 100;
        canvas.height = 100;
        this.drawingContext = canvas.getContext('2d');
        this.drawingContext.beginPath();
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.lineWidth = 3;
        this.drawingContext.moveTo(0, 0);
        this.drawingContext.lineTo(100, 100);
        this.drawingContext.stroke();
        this.selfElement.append(canvas);
    }
    isRightPosition(cursorX, cursorY) {
        let k = this.selfElement.offsetHeight / this.selfElement.offsetWidth;
        if (cursorX * k >= cursorY - 7 && cursorX * k <= cursorY + 7) {
            return true;
        } else return false;
    }
}