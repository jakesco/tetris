
var canvasBoard = document.getElementById('board');
var ctxBoard = canvasBoard.getContext('2d');

var canvasNext = document.getElementById('next');
var ctxNext = canvasNext.getContext('2d');

var canvasHeld = document.getElementById('held');
var ctxHeld = canvasHeld.getContext('2d');

let time = { start: 0, elapsed: 0, level: 1000 };
let p = new Piece(ctxBoard, TYPES.Z);

init();


function animate(now = 0) {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
        time.start = now;
        p.down();
    }

    // Clear board before drawing new state.
    ctxBoard.clearRect(0, 0, ctxBoard.canvas.width, ctxBoard.canvas.height);

    p.draw();

    requestId = requestAnimationFrame(animate);
}

function init() {
    ctxBoard.canvas.width = COLS * BLOCK_SIZE;
    ctxBoard.canvas.height = ROWS * BLOCK_SIZE;
    ctxNext.canvas.width = 5 * BLOCK_SIZE;
    ctxNext.canvas.height = 5 * BLOCK_SIZE;
    ctxHeld.canvas.width = 5 * BLOCK_SIZE;
    ctxHeld.canvas.height = 5 * BLOCK_SIZE;
    window.requestAnimationFrame(animate);
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

