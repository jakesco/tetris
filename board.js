class Board {
    ctxBoard;
    ctxNext;
    ctxHeld;
    board;
    upcomming;
    piece;
    nextPiece;
    heldPiece;
    constructor(ctxBoard, ctxNext, ctxHeld) {
        this.ctxBoard = ctxBoard;
        this.ctxNext = ctxNext;
        this.ctxHeld = ctxHeld;
        this.board = this.emptyGrid();
        this.upcomming = pickRandom();
        this.piece = new Piece(ctxBoard, this.upcomming.pop());
        this.piece.adjust();
        this.nextPiece = new Piece(ctxNext, this.upcomming.pop());
        this.heldPiece = null;
        this.init();
    }

    init() {
        // set board sizes
        this.ctxBoard.canvas.width = COLS * BLOCK_SIZE;
        this.ctxBoard.canvas.height = ROWS * BLOCK_SIZE;
        this.ctxNext.canvas.width = 4 * BLOCK_SIZE;
        this.ctxNext.canvas.height = 4 * BLOCK_SIZE;
        this.ctxHeld.canvas.width = 4 * BLOCK_SIZE;
        this.ctxHeld.canvas.height = 4 * BLOCK_SIZE;
    }

    draw() {
        this.piece.draw();
        this.nextPiece.draw();
    }

    validMove(p) {
        return p.shape.every((row, dy) => {
            return row.every((cell, dx) => {
                let x = this.piece.xPos + dx;
                let y = this.piece.yPos + dy;
                return (
                    cell === 0 || 
                    (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
                )
            });
        });
    }

    drop() {
        let x = new Piece(ctxBoard, 0);
        x = Object.assign(x, this.piece)
        x.yPos++;
        if(this.validMove(x))
            this.piece.yPos++;
    }

    left() {
        let x = new Piece(ctxBoard, 0);
        x = Object.assign(x, this.piece)
        x.yPos--;
        if(this.validMove(x))
            this.piece.xPos--;
    }

    right() {
        let x = new Piece(ctxBoard, 0);
        x = Object.assign(x, this.piece)
        x.xPos = x.xPos + 3;
        if(this.validMove(x))
            this.piece.xPos++;
    }

    emptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y <= ROWS;
    }

    notOccupied(x, y) {
        return true;
    }
    
}
