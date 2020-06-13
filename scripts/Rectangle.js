class Rectangle extends GraphicObject {
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
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.lineWidth = 5;
        this.drawingContext.strokeRect(0, 0, 100, 100);
        this.selfElement.append(canvas);
    }
    isRightPosition(cursorX, cursorY) {
        if (Math.abs(cursorX) <= 5 && cursorY) return true;
        if (Math.abs(cursorY) <= 5 && cursorX) return true;
        if (Math.abs(cursorX - this.selfElement.offsetWidth) <= 5 && Math.abs(cursorY)) return true;
        if (Math.abs(cursorY - this.selfElement.offsetHeight) <= 5 && Math.abs(cursorY)) return true;
        return false;
    }
}