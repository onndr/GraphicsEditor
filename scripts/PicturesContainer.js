class PicturesContainer {
    elements = [];
    constructor(parent) {
        this.createSelf(parent);
    }
    createSelf(parent) {
        this.selfElement = document.createElement('div');
        this.selfElement.className = 'generalContainer';
        this.parent = parent;
        this.parent.addElement(this);
    }
    addElement(element) {
        element.setParent(this, this.elements.length);
        this.elements.push(element);
        this.parent.pictures.push(element);
        this.selfElement.append(element.selfElement);
    }
    setTarget(event) {
        if (this.target) this.target.unfocus();
        switch (event) {
            case 'none':
                this.target = null;
                break;
            default:
                this.target = this.elements[event.target.parentNode.index];
                let style = [this.target.selfElement.offsetLeft, this.target.selfElement.offsetTop];
                if (this.target.constructor.name === 'Img') this.target = new Img(this.target.source);
                if (this.target.constructor.name === 'Rectangle') this.target = new Rectangle(this.target.color);
                if (this.target.constructor.name === 'Line') this.target = new Line(this.target.color);
                if (this.target.constructor.name === 'Triangle') this.target = new Triangle(`${this.target.kind}`, this.target.color);
                if (this.target.constructor.name === 'Circle') this.target = new Circle(this.target.color);
                this.target.setParent(this.parent, this.parent.pictures.length);
                this.parent.setTarget(this.target, style);
                if (this.target) this.target.focus();
                break;
        }
    }
    removeElement(index) {
        if (!this.elements[index]) return;
        this.elements[index].removeSelfElement();
        this.elements.splice(index, 1);
    }
    removeSelfElement = () => {
        this.selfElement.remove();
    }
}
