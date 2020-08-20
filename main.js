
var canvasBoard = document.getElementById('board');
var ctxBoard = canvasBoard.getContext('2d');

var canvasNext = document.getElementById('next');
var ctxNext = canvasNext.getContext('2d');

var canvasHeld = document.getElementById('held');
var ctxHeld = canvasHeld.getContext('2d');

init();
demo();

function init() {
    ctxBoard.canvas.width = COLS * BLOCK_SIZE;
    ctxBoard.canvas.height = ROWS * BLOCK_SIZE;
    ctxNext.canvas.width = 5 * BLOCK_SIZE;
    ctxNext.canvas.height = 5 * BLOCK_SIZE;
    ctxHeld.canvas.width = 5 * BLOCK_SIZE;
    ctxHeld.canvas.height = 5 * BLOCK_SIZE;
}

async function demo() {
    while (true) {
        for (key in TYPES) {
            let p = new Piece(ctxBoard, TYPES[key]);
            p.draw();
            await sleep(1000);
            ctxBoard.clearRect(0, 0, ctxBoard.canvas.height, ctxBoard.canvas.width);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}