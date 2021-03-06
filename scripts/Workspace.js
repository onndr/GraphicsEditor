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
                if (this.elements.includes(event.target?.parentNode?.obj) && event.target?.parentNode?.obj?.isRotated) {
                    let el = event.target.parentNode.obj;
                    if (el.isRightPosition(true, event.offsetX, event.offsetY)) {
                        el.focus();
                        this.elements.splice(this.elements.indexOf(el), 1);
                        this.parent.setTarget(el, [el.getIndents().left, el.getIndents().top]);
                        return;
                    }
                }
                let underCursorElements = this.elements.filter(
                    el => {
                        if (event.x - el.selfElement.offsetLeft >= 0
                            && event.x <= (el.selfElement.offsetLeft + el.selfElement.offsetWidth)
                            && event.y - el.selfElement.offsetTop >= 0
                            && event.y <= (el.selfElement.offsetTop + el.selfElement.offsetHeight)) {
                            return true;
                        }
                    }
                );
                for (let i = underCursorElements.length - 1; i >= 0; i--) {
                    let el = underCursorElements[i];
                    if (el.isRightPosition(false, event.x, event.y)) {
                        el.focus();
                        this.elements.splice(this.elements.indexOf(el), 1);
                        this.parent.setTarget(el, [el.getIndents().left, el.getIndents().top]);
                        return;
                    }
                }
                break;
        }
    }
    addElement(element, index) {
        element.setParent(this, index);
        this.target = element;
        this.elements.push(this.target);
        this.parent.pictures.push(this.target);
        this.target.setIndents(this.target.getIndents().left, this.target.getIndents().top);
        this.selfElement.append(this.target.selfElement);
        element.focus();
    }
    rotateTarget = (keyCode) => {
        if (!this.target) return;
        keyCode === 97 ? this.target.rotate(-2) : this.target.rotate(2);
    }
}
