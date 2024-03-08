class Square {
    constructor(element, pos = null, color = 'white') {
        this.element = element;
        this.pos = pos;
        this.piece = null;
        this.color = color;
        this.flipImage = board.pov == color;

        this.image = document.createElement('img');
        this.image.classList.add('piece-img');
        this.element.append(this.image);
        this.element.addEventListener('click', this.onclick.bind(this));
    }

    highlight() {
        if(this.color == 'white') {
            this.element.style.background = 'lightcoral';
        }
        else {
            this.element.style.background = 'tomato';
        }
    }

    unhighlight() {
        if(this.color == 'white') {
            this.element.style.background = themeList[theme][0];
        }
        else {
            this.element.style.background = themeList[theme][1];
        }
    }

    onclick() {
        board.unhighlightAll();
        board.selectSquare(this);
        this.highlight();
    }

    updateImage() {
        if(this.piece == null) {
            this.image.src = '';
            return;
        }
        this.image.src = `assets/${this.piece.name}${this.piece.color}${board.pov != this.piece.color && flipOpponent ? 'flip' : ''}.png`;
    }

    setPiece(piece) {
        this.piece = piece;
        this.flipImage = board.pov == piece?.color;
        this.updateImage();
    }

    setPos(pos) {
        this.pos = pos;
    }
}