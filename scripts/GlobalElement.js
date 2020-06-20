class GlobalElement {
    pictures = [];
    constructor(parent) {
        this.createSelf(parent);
    }
    createSelf(parent) {
        this.selfElement = document.createElement('div');
        this.selfElement.className = 'globalWrapper';
        parent.append(this.selfElement);
        this.setEventListeners();
    }
    setTarget(element, style) {
        this.target = element;
        this.target.selfElement.className = 'currentTarget';
        this.target.setIndents(style[0], style[1]);
        this.selfElement.append(this.target.selfElement);
    }
    addElement = (element) => {
        if(element.constructor.name === 'Workspace'){
            this.workspace = element;
            this.selfElement.append(element.selfElement);
            return;
        } else if (element.constructor.name === 'PicturesContainer'){
            this.container = element;
        } else if (element.constructor.name === 'Bin'){
            this.bin = element;
        }
        if(!this.rightEl){
            this.rightEl = document.createElement('div');
            this.rightEl.className = 'right';
            this.selfElement.append(this.rightEl);
        }
        this.rightEl.append(element.selfElement);
    }
    removeTarget(index = null) {
        this.pictures[index].removeSelfElement();
        this.target = undefined;
        this.pictures.splice(index, 1);
    }
    removeElement(element) {
        if (element.constructor.name === 'Workspace') {
            this.workspace.removeSelfElement();
            this.workspace = undefined;
        } else if (element.constructor.name === 'PicturesContainer') {
            this.container.removeSelfElement();
            this.container = undefined;
        } else if (element.constructor.name === 'Bin') {
            this.bin.removeSelfElement();
            this.bin = undefined;
        }
    }
    setEventListeners() {
        this.selfElement.addEventListener('mousedown', this.mouseDownHandler);
        this.selfElement.addEventListener('mousemove', this.mouseMoveHandler);
        this.selfElement.addEventListener('mousemove', this.onResize);
        this.selfElement.addEventListener('mouseup', this.mouseUpHandler);
        document.body.addEventListener('keypress', this.rotateTargetElement);
    }
    mouseDownHandler = (event) => {
        event.preventDefault();
        if (event.target.tagName !== 'IMG' && event.target.tagName !== 'CANVAS') {
            this.workspace.setTarget('none');
            this.container.setTarget('none');
            if (this.target) this.target.setCursor('default');
            if (this.resizingTarget) this.resizingTarget.setCursor('default');
            this.target = undefined;
            this.resizingTarget = undefined;
        } else if (event.composedPath().includes(this.workspace?.selfElement)) {
            this.workspace.setTarget(event);
            this.container.setTarget('none');
        } else if (event.composedPath().includes(this.container?.selfElement)) {
            this.container.setTarget(event);
            this.workspace.setTarget('none');
        }
    }
    mouseUpHandler = (event) => {
        event.preventDefault();
        if (event.x > this.workspace.selfElement.offsetLeft && event.x < this.workspace.selfElement.offsetLeft + this.workspace.selfElement.offsetWidth
            && event.y > this.workspace.selfElement.offsetTop && event.y < this.workspace.selfElement.offsetTop + this.workspace.selfElement.offsetHeight
            && this.target) {
            this.target.setCursor('default');
            this.target.setMode('selected', true, false);
            this.workspace.addElement(this.target, this.target.index);
            this.target = undefined;
        } else if (event.x > this.bin.selfElement.offsetLeft && event.x < this.bin.selfElement.offsetLeft + this.bin.selfElement.offsetWidth
            && event.y > this.bin.selfElement.offsetTop && event.y < this.bin.selfElement.offsetTop + this.bin.selfElement.offsetHeight
            && this.target) {
            this.target.selfElement.remove();
            this.target = undefined;
        } else {
            this.container.setTarget('none');
            this.workspace.setTarget('none');
        }
        if (this.target) this.target.selfElement.remove();
        this.target = undefined;
        this.resizingTarget = undefined;
    }
    mouseMoveHandler = (event) => {
        event.preventDefault();
        if (this.target) {
            if(event.which === 1 && !this.target.isResizing){
                this.target.setMode('moving', true);
                this.target.setIndents(
                    this.target.getIndents().left + event.movementX,
                    this.target.getIndents().top + event.movementY
                );
                this.target.setCursor('move');
            } else {
                this.target.setCursor('default');
            }
        }
    }
    onResize = (event) => {
        event.preventDefault();
        if ((event.target?.parentNode?.obj?.isSelected && !event.target?.parentNode?.obj?.isMoving) || this.resizingTarget) {
            if (this.isRightResizingPosition(event.target.parentNode, event.offsetX, event.offsetY) || this.resizingTarget) {
                if (!this.resizingTarget) this.resizingTarget = event.target.parentNode.obj;
                if (this.isRightResizingPosition(this.resizingTarget.selfElement, event.offsetX, event.offsetY) || this.resizingTarget.isResizing) {
                    this.resizingTarget.setCursor('nwse-resize');
                    if (event.which === 1) {
                        this.resizingTarget.setMode('resizing', true)
                        this.resizingTarget.setSize(
                            event.x - this.resizingTarget.getIndents().left,
                            event.y - this.resizingTarget.getIndents().top
                        );
                    } else if (event.which === 0) {
                        this.resizingTarget.setMode('resizing', false);
                    }
                } else this.resizingTarget.setCursor('default');
            }
        }
    }
    rotateTargetElement = (event) => {
        if (event.which !== 97 && event.which !== 100) return;
        if (this.workspace.target) {
            this.workspace.rotateTarget(event.which);
        }
    }
    isRightResizingPosition = (target, cursorX, cursorY) => {
        if (!target || !cursorX || !cursorY) return false;
        if (Math.abs(cursorX - target.offsetWidth) <= 10
            && Math.abs(cursorY - target.offsetHeight) <= 10) {
            return true;
        }
        return false;
    }
}