class Bin {
    constructor(parent, binImageSource) {
        this.createSelf(parent, binImageSource);
    }
    createSelf(parent, binImageSource) {
        this.parent = parent;
        this.selfElement = document.createElement('div');
        this.selfElement.className = 'bin';
        let binImage = document.createElement('img');
        binImage.src = binImageSource;
        this.selfElement.append(binImage);
        this.parent.addElement(this);
    }
    removeSelfElement(){
        this.selfElement.remove();
    }
}