class Shape extends GraphicObject{
    constructor(color = 'red') {
        super();
        this.color = color;
        this.createSelf();
    }
    createSelf = () => {
        this.selfElement = document.createElement('div');
        this.selfElement.className = 'wrapperDiv';
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'wrappedImage';
        this.canvas.width = 100;
        this.canvas.height = 100;
        this.selfElement.append(this.canvas);
    }
    setSize(newWidth, newHeight){
        this.drawingContext.clearRect(0, 0, this.getSize().width, this.getSize().height);
        this.selfElement.style.width = newWidth + 'px';
        this.selfElement.style.height = newHeight + 'px';
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.drawShape(newWidth, newHeight);
    }
    adaptCoords(isOffset, cursorX, cursorY){
        let x;
        let y;
        if (!isOffset) {
            x = cursorX - this.selfElement.offsetLeft;
            y = cursorY - this.selfElement.offsetTop;
        } else {
            x = cursorX;
            y = cursorY;
        }
        return {x, y};
    }
}