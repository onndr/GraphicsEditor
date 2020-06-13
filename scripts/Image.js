class Img extends GraphicObject {
    constructor(source) {
        super();
        if (source) this.source = source;
        this.createSelf(source);
    }
    createSelf = (source) => {
        if (!source) return;
        this.selfElement = document.createElement('div');
        this.selfElement.className = 'wrapperDiv';
        let image = document.createElement('img');
        image.className = 'wrappedImage';
        image.src = source;
        this.selfElement.append(image);
    }
}
