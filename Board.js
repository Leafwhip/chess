class Board {
    constructor(element, size, squareSize, theme) {
        this.grid;
        this.element = element;
        this.height = size[0];
        this.width = size[1];
        this.squareSize = squareSize;
        this.theme = theme;
        this.selectedPiece = null;
        this.pov = 'white';
    }

    unhighlightAll() {
        for(let i = 0; i < this.grid.length; i++) {
            for(let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j].unhighlight();
            }
        }
    }

    highlightList(list) {
        for(let i = 0; i < list.length; i++) {
            let pos = list[i];
            this.grid[pos[0]][pos[1]].highlight();
        }
    }

    getPiece(pos) {
        if(!this.inBounds(pos)) {
            return 'Out of bounds!';
        }
        return this.grid[pos[0]][pos[1]].piece;
    }

    inBounds(pos) {
        if(pos[0] < 0 || pos[0] > this.height - 1 || pos[1] < 0 || pos[1] > this.width - 1) {
            return false;
        }
        return true;
    }

    selectSquare(square) {
        if(this.selectedPiece == null) {
            if(square.piece == null) {
                return;
            }
            this.selectedPiece = square.piece;
            this.selectedPiece.select();
        }
        else {
            this.move(this.selectedPiece.pos, square.pos);
            this.selectedPiece = null;
        }
    }

    createBoard() {
        this.grid = Array(this.height).fill(Array(this.width)).map(a => [...a]);
        this.element.innerHTML = '';
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                let element = document.createElement('div');
                element.classList.add('square');
                let color = i % 2 + j % 2 == 1 ? 'black' : 'white';
                element.classList.add(color);
                element.style.width = squareSize;
                element.style.height = squareSize;
                this.element.append(element);
                let square = new Square(element, [i, j], color);
                this.grid[i][j] = square;
            }
        }
        this.element.style.height = `${squareSize * this.height}px`;
        this.element.style.width = `${squareSize * this.width}px`;
    }

    flipBoard() {
        
    }

    setup() {
        this.createBoard(this.height, this.width);
        let [layout, colors] = defaultLayout;
        for(let i = 0; i < layout.length; i++) {
            for(let j = 0; j < layout[0].length; j++) {
                let name = layout[i][j];
                let color = colorKey[colors[i][j]];
                if(name && color) {
                    let piece = createPiece(name, color, [i, j]);
                    this.grid[i][j].setPiece(piece);
                }
            }
        }
    }
    
    move(start, end) {
        console.log(start, end)
        this.grid[end[0]][end[1]].setPiece(this.grid[start[0]][start[1]].piece);
        this.grid[end[0]][end[1]].piece.setPos([end[0], end[1]]);
        this.grid[end[0]][end[1]].piece.moved = true;
        this.grid[start[0]][start[1]].setPiece(null);
    }
}