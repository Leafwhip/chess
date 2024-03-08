class Piece {
    constructor(color = 'white', pos = null) {
        this.color = color;
        this.pos = pos;
        this.name = '';
        this.points = 0;
        this.moved = false;
    }

    setPos(pos) {
        this.pos = pos;
    }

    select() {
        if(turn != this.color) {
            // return;
        }
        let possibleMoves = this.getPossibleMoves();
        board.highlightList(possibleMoves);
    }

    getPossibleMoves() {
        return [];
    }

    checkSquare(pos) {
        let piece = board.getPiece(pos);
        if(piece == null) {
            return 1;
        }
        if(piece.color && piece.color != this.color) {
            return 2;
        }
        return 0;
    }

    calcNewPos(_d) {
        let d = _d;
        if(board.pov != this.color) {
            d = [-_d[0], -_d[1]];
        }
        return [this.pos[0] + d[0], this.pos[1] + d[1]];
    }

    line(d) {
        let list = [];
        let z = 0;
        let end1 = false;
        let end2 = false;
        while(++z < 1000) {
            let newPos1 = this.calcNewPos([z * d[0], z * d[1]]);
            let newPos2 = this.calcNewPos([-z * d[0], -z * d[1]]);
            let check1 = this.checkSquare(newPos1);
            let check2 = this.checkSquare(newPos2);
            
            if(!end1 && check1) {
                list.push(newPos1);
            }
            if(!end2 && check2) {
                list.push(newPos2);
            }
            if(check1 != 1) {
                end1 = true;
            }
            if(check2 != 1) {
                end2 = true;
            }
            if(end1 && end2) {
                break;
            }
        }
        return list;
    }
}

class Pawn extends Piece {
    constructor(color, pos) {
        super(color, pos);
        this.name = 'pawn';
        this.points = 1;
        this.enpassantable = false;
    }

    getPossibleMoves() {
        let possibleMoves = [];
        if(this.checkSquare(this.calcNewPos([-1, 0])) == 1) {
            possibleMoves.push(this.calcNewPos([-1, 0]));
            if(this.checkSquare(this.calcNewPos([-2, 0])) == 1 && !this.moved) {
                possibleMoves.push(this.calcNewPos([-2, 0]));
            }
        }
        if(this.checkSquare(this.calcNewPos([-1, -1])) == 2) {
            possibleMoves.push(this.calcNewPos([-1, -1]));
        }
        if(this.checkSquare(this.calcNewPos([-1, 1])) == 2) {
            possibleMoves.push(this.calcNewPos([-1, 1]));
        }
        return possibleMoves;
    }
}

class Knight extends Piece {
    constructor(color, pos) {
        super(color, pos);
        this.name = 'knight';
        this.points = 3;
    }

    getPossibleMoves() {
        let possibleMoves = [];
        [[-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2]].forEach(d => {
            if(this.checkSquare(this.calcNewPos(d)) != 0) {
                possibleMoves.push(this.calcNewPos(d));
            }
        })
        return possibleMoves;
    }
}

class Bishop extends Piece {
    constructor(color, pos) {
        super(color, pos);
        this.name = 'bishop';
        this.points = 3;
    }

    getPossibleMoves() {
        let possibleMoves = [];
        [[1, 1], [1, -1]].forEach(d => {
            let line = this.line(d);
            for(let i = 0; i < line.length; i++) {
                possibleMoves.push(line[i]);
            }
        })
        return possibleMoves;
    }
}

class Rook extends Piece {
    constructor(color, pos) {
        super(color, pos);
        this.name = 'rook';
        this.points = 5;
    }

    getPossibleMoves() {
        let possibleMoves = [];
        [[1, 0], [0, 1]].forEach(d => {
            let line = this.line(d);
            for(let i = 0; i < line.length; i++) {
                possibleMoves.push(line[i]);
            }
        })
        return possibleMoves;
    }
}

class Queen extends Piece {
    constructor(color, pos) {
        super(color, pos);
        this.name = 'queen';
        this.points = 9;
    }
    
    getPossibleMoves() {
        let possibleMoves = [];
        [[1, 0], [1, 1], [0, 1], [-1, 1]].forEach(d => {
            let line = this.line(d);
            for(let i = 0; i < line.length; i++) {
                possibleMoves.push(line[i]);
            }
        })
        return possibleMoves;
    }
}

class King extends Piece {
    constructor(color, pos) {
        super(color, pos);
        this.name = 'king';
        this.points = 0;
    }

    getPossibleMoves() {
        let possibleMoves = [];
        [[0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1]].forEach(d => {
            if(this.checkSquare(this.calcNewPos(d)) != 0) {
                possibleMoves.push(this.calcNewPos(d));
            }
        })
        return possibleMoves;
    }
}

function createPiece(name, color, pos) {
    let pieces = {
        pawn: Pawn,
        knight: Knight,
        bishop: Bishop,
        rook: Rook,
        queen: Queen,
        king: King
    }
    let piece = new pieces[name](color, pos);
    return piece;
}


