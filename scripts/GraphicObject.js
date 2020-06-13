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
}