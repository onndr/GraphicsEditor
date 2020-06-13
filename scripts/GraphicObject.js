class GraphicObject {
    isResizing = false;
    isMoving = false;
    setParent(parent, index) {
        this.parent = parent;
        this.index = index;
        this.selfElement.index = index;
        this.selfElement.obj = this;
    }
    focus = () => {
        this.isSelected = true;
        this.selfElement.isSelected = true;
        this.selfElement.style.border = 'solid 2px red';
    }
    unfocus() {
        this.isSelected = false;
        this.selfElement.isSelected = false;
        this.selfElement.style.border = 'none';
    }
    setSize(newWidth, newHeight){
        this.selfElement.style.width = newWidth + 'px';
        this.selfElement.style.height = newHeight + 'px';
    }
    rotate = (value) => {
        const getAngle = (string) => {
            if (!string) return 0;
            let numberString = '';
            let isNumber = false;
            for (let i = 0; i < string.length; i++) {
                if (string[i] === 'd') {
                    return Number(numberString);
                }
                if (isNumber) {
                    numberString += string[i];
                }
                if (string[i] === '(') {
                    isNumber = true;
                }
            }
        };
        this.selfElement.style.transform = `rotate(${getAngle(this.selfElement.style.transform) + value}deg)`;
    }
    setIndents = (newLeftIndent, newTopIndent) => {
        this.selfElement.style.left = `${newLeftIndent}px`;
        this.selfElement.style.top = `${newTopIndent}px`;
    }
    getIndents = () => {
        return {
            left: parseInt(this.selfElement.style.left),
            top: parseInt(this.selfElement.style.top)
        };
    }
    getSize = () => {
        return {
            width: parseInt(this.selfElement.style.width),
            height: parseInt(this.selfElement.style.height)
        };
    }
    setCursor = (newCursor) => {
        this.selfElement.style.cursor = newCursor;
    }
    removeSelfElement = () => {
        this.selfElement.remove();
    }
    setMode(mode, value, othersModeValue = true){
        switch (mode){
            case 'selected':
                this.isSelected = value;
                if(!othersModeValue){
                    this.isMoving = false;
                    this.isResizing = false;
                }
                break;
            case 'moving':
                this.isMoving = value;
                if(!othersModeValue){
                    this.isSelected = false;
                    this.isResizing = false;
                }
                break;
            case 'resizing':
                this.isResizing = value;
                if(!othersModeValue){
                    this.isMoving = false;
                    this.isSelected = false;
                }
                break;
        }
    }
}