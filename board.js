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
        this.drawBoard();
        this.piece.draw();
        this.nextPiece.draw();
    }

    drawBoard() {
        this.board.forEach((row, j) => {
            row.forEach((cell, i) => {
                if (cell > 0) {
                    drawBlock(this.ctxBoard, COLORS[cell - 1], i, j);
                }
            });
        });
    }

    validMove(p) {
        return p.shape.every((row, dy) => {
            return row.every((cell, dx) => {
                let x = p.xPos + dx;
                let y = p.yPos + dy;
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
        if (this.validMove(x)) {
            this.piece.yPos++;
        } else {
            this.freeze();
            this.clearLines();
        }
    }

    left() {
        let x = new Piece(ctxBoard, 0);
        x = Object.assign(x, this.piece)
        x.xPos--;
        if (this.validMove(x))
            this.piece.xPos--;
    }

    right() {
        let x = new Piece(ctxBoard, 0);
        x = Object.assign(x, this.piece)
        x.xPos++;
        if (this.validMove(x))
            this.piece.xPos++;
    }

    rotate() {
        // make deep copy of shape array
        let p = JSON.parse(JSON.stringify(this.piece));

        // Transpose then swap to get 90 Clockwise rotation
        for (let i = 0; i < p.shape.length; i++) {
            for (let j = 0; j < i; j++) {
                [p.shape[i][j], p.shape[j][i]] =
                    [p.shape[j][i], p.shape[i][j]];
            }
        }
        p.shape.forEach((row) => { row.reverse(); })

        if (this.validMove(p))
            this.piece.shape = p.shape;
    }

    freeze() {
        let x = this.piece.xPos;
        let y = this.piece.yPos;
        let cell;
        for (let j = 0; j < this.piece.shape.length; j++) {
            for (let i = 0; i < this.piece.shape[j].length; i++) {
                cell = this.piece.shape[j][i];
                if (cell > 0)
                    this.board[y + j][x + i] = cell;
            }
        }

        this.piece = this.nextPiece;
        this.piece.changeCtx(ctxBoard);
        if (this.upcomming.length === 0)
            this.upcomming = pickRandom();
        this.nextPiece = new Piece(ctxNext, this.upcomming.pop());
    }

    clearLines() {
        this.board.forEach((row, i) => {
            if (row.every(x => x >= 1))
                this.removeLine(i);
            console.log("line");
        });
    }

    removeLine(lineNumber) {
        for (let i = lineNumber; i > 0; i--) {
            this.board[i] = this.board[i - 1];
        }
    }

    emptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y < ROWS;
    }

    notOccupied(x, y) {
        if (this.board[y])
            return this.board[y][x] === 0;
        return true;
    }

}
