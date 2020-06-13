class Triangle extends GraphicObject {
    constructor(kind, color = 'red') {
        super();
        this.color = color;
        this.kind = kind;
        this.createSelf(kind);
    }
    createSelf = (kind) => {
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
        if (kind === 'isosceles') {
            this.drawingContext.moveTo(49, 0);
            this.drawingContext.lineTo(99, 99);
            this.drawingContext.lineTo(0, 99);
            this.drawingContext.lineTo(49, 0);
        } else if (kind === 'right') {
            this.drawingContext.moveTo(0, 0);
            this.drawingContext.lineTo(99, 99);
            this.drawingContext.lineTo(0, 99);
            this.drawingContext.lineTo(0, 0);
        }
        this.drawingContext.stroke();
        this.selfElement.append(canvas);
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