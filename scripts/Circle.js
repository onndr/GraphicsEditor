class Circle extends GraphicObject {
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
        this.drawingContext.beginPath();
        this.drawingContext.arc(50, 50, 49, 0, 2 * Math.PI);
        this.drawingContext.stroke();
        this.selfElement.append(canvas);
    }
    isRightPosition(cursorX, cursorY) {
        let radiusLength = Math.sqrt((this.selfElement.offsetWidth/2)**2);
        let length = Math.sqrt((cursorX-this.selfElement.offsetWidth/2)**2 + (cursorY-this.selfElement.offsetHeight/2)**2);
        if(Math.abs(length-radiusLength) < 5)return true;
       /* if (cursorY <= 10 && Math.abs(cursorX - this.selfElement.offsetWidth / 2) <= 10) return true;
        if (cursorX <= 10 && Math.abs(cursorY - this.selfElement.offsetHeight / 2) <= 10) return true;
        if (Math.abs(cursorX - this.selfElement.offsetWidth) <= 10 && Math.abs(cursorY - this.selfElement.offsetHeight / 2) <= 10) return true;
        if (Math.abs(cursorY - this.selfElement.offsetHeight) <= 10 && Math.abs(cursorX - this.selfElement.offsetWidth / 2) <= 10) return true;*/
        return false;
    }
}