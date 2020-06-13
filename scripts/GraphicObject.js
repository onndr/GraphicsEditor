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
}