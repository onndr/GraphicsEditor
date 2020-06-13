class Workspace extends PicturesContainer {
    constructor(parent) {
        super(parent);
    }
    createSelf(parent) {
        this.selfElement = document.createElement('div');
        this.selfElement.className = 'workspace';
        this.parent = parent;
        this.parent.addElement(this);
    }
    setTarget(event) {
        if (this.target) {
            this.target.unfocus();
            this.target = null;
        }
        switch (event.target?.parentNode) {
            case undefined:
                break;
            case 'none':
                break;
            default:
                if (this.elements.includes(event.target.parentNode.obj)) {
                    this.target = event.target.parentNode.obj;
                    if (this.target.constructor.name !== 'Img') {
                        if (this.target.isRightPosition(event.offsetX, event.offsetY)) {
                            this.target.focus();
                            this.parent.setTarget(this.target, [this.target.selfElement.offsetLeft, this.target.selfElement.offsetTop]);
                            return;
                        }
                    } else {
                        this.target.focus();
                        this.parent.setTarget(this.target, [this.target.selfElement.offsetLeft, this.target.selfElement.offsetTop]);
                    }
                }
                break;
        }
    }
    addElement(element) {
        element.setParent(this, this.elements.length);
        this.elements.push(element);
        this.parent.pictures.push(element);
        element.selfElement.style.left = parseInt(element.selfElement.style.left) - 13 + 'px';
        element.selfElement.style.top = parseInt(element.selfElement.style.top) - 13 + 'px';
        this.target = element;
        this.selfElement.append(element.selfElement);
    }
    rotateTarget = (keyCode) => {
        if(!this.target)return;
        keyCode === 97? this.target.rotate(-2): this.target.rotate(2);
    }
}
