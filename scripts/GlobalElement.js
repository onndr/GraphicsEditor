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
        element.selfElement.className = 'currentTarget';
        element.selfElement.style.position = 'absolute';
        element.selfElement.style.left = (style[0] + 13) + 'px';
        element.selfElement.style.top = (style[1] + 13) + 'px';
        this.selfElement.append(element.selfElement);
    }
    addElement = (element) => {
        element.constructor.name === 'Workspace' ?
            this.workspace = element : element.constructor.name === 'PicturesContainer' ?
                this.container = element : this.bin = element

        this.selfElement.append(element.selfElement);
    }
    removeTarget(index = null) {
        this.pictures[index].selfElement.remove();
        this.target = undefined;
        this.pictures.splice(index, 1);
    }
    removeElement(element) {
        if (element.constructor.name === 'Workspace') {
            this.workspace.selfElement.remove();
            this.workspace = undefined;
        } else if (element.constructor.name === 'PicturesContainer') {
            this.container.selfElement.remove();
            this.container = undefined;
        } else if (element.constructor.name === 'Bin') {
            this.bin.selfElement.remove();
            this.bin = undefined;
        }
    }
    setEventListeners() {
        this.selfElement.addEventListener('mousedown', this.onMouseDown);
        this.selfElement.addEventListener('mousemove', this.onMove);
        this.selfElement.addEventListener('mousemove', this.onResize);
        this.selfElement.addEventListener('mouseup', this.onMouseUp);
        document.body.addEventListener('keypress', this.rotateTargetElement);
    }
    onMouseDown = (event) => {
        event.preventDefault();
        if (event.target.tagName !== 'IMG' && event.target.tagName !== 'CANVAS') {
            this.workspace.setTarget('none');
            this.container.setTarget('none');
            if (this.target) this.target.selfElement.style.cursor = 'default';
            if (this.resizingTarget) this.resizingTarget.selfElement.style.cursor = 'default';
            this.target = undefined;
            this.resizingTarget = undefined;
        } else if (event.path.includes(this.workspace?.selfElement)) {
            this.workspace.setTarget(event);
            this.container.setTarget('none');
        } else if (event.path.includes(this.container?.selfElement)) {
            this.container.setTarget(event);
            this.workspace.setTarget('none');
        }
    }
    onMouseUp = (event) => {
        event.preventDefault();
        if (event.x > this.workspace.selfElement.offsetLeft && event.x < this.workspace.selfElement.offsetLeft + this.workspace.selfElement.offsetWidth
            && event.y > this.workspace.selfElement.offsetTop && event.y < this.workspace.selfElement.offsetTop + this.workspace.selfElement.offsetHeight
            && this.target) {
            this.target.selfElement.style.cursor = 'default';
            this.target.isMoving = false;
            this.target.isResizing = false;
            this.target.isSelected = true;
            this.workspace.addElement(this.target);
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
    onMove = (event) => {
        event.preventDefault();
        if (this.target && event.which === 1 && !this.target.isResizing) {
            this.target.isMoving = true;
            this.target.selfElement.style.left = parseInt(this.target.selfElement.style.left) + event.movementX + 'px';
            this.target.selfElement.style.top = parseInt(this.target.selfElement.style.top) + event.movementY + 'px';
            this.target.selfElement.style.cursor = 'move';
        }
    }
    onResize = (event) => {
        event.preventDefault();
        if ((event.target?.parentNode?.obj?.isSelected && !event.target?.parentNode?.obj?.isMoving) || this.resizingTarget) {
            if (this.isRightResizingPosition(event.target.parentNode, event.offsetX, event.offsetY) || this.resizingTarget) {
                if (!this.resizingTarget) this.resizingTarget = event.target.parentNode.obj;
                if (this.isRightResizingPosition(this.resizingTarget.selfElement, event.offsetX, event.offsetY) || this.resizingTarget.isResizing) {
                    this.resizingTarget.selfElement.style.cursor = 'nwse-resize';
                    if (event.which === 1) {
                        this.resizingTarget.isResizing = true;
                        this.resizingTarget.selfElement.style.width = event.x - Number.parseInt(this.resizingTarget.selfElement.style.left) + 'px';
                        this.resizingTarget.selfElement.style.height = event.y - Number.parseInt(this.resizingTarget.selfElement.style.top) + 'px';
                    } else if (event.which === 0) {
                        this.resizingTarget.isResizing = false;
                    }
                }
            }
        }
    }
    rotateTargetElement = (event) => {
        if (event.which !== 97 && event.which !== 100) return;
        if (this.workspace.target) {
            this.workspace.rotateTarget(event.which)
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