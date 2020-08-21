// Get canvas contexts
var ctxBoard = document.getElementById('board').getContext('2d');
var ctxNext = document.getElementById('next').getContext('2d');
var ctxHeld = document.getElementById('held').getContext('2d');

let time = { start: 0, elapsed: 0, level: 1000 };
let b = new Board(ctxBoard, ctxNext, ctxHeld)
addEventListener();
let requestId = requestAnimationFrame(animate);

function animate(now = 0) {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
        // console.clear();
        time.start = now;
        // console.table(b.board);

        b.drop();
    }

    // Clear board before drawing new state.
    ctxBoard.clearRect(0, 0, ctxBoard.canvas.width, ctxBoard.canvas.height);
    ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);
    ctxHeld.clearRect(0, 0, ctxHeld.canvas.width, ctxHeld.canvas.height);

    b.draw();

    requestId = requestAnimationFrame(animate);
}

function addEventListener() {
    document.addEventListener('keydown', event => {
        event.preventDefault();

        switch (event.keyCode) {
            case KEY.LEFT:
                b.left();
                break;
            case KEY.RIGHT:
                b.right();
                break;
            case KEY.DOWN:
                b.drop();
                break;
            case KEY.UP:
                b.rotate();
                break;
        }
    });
}

moves = {
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
    [KEY.UP]: p => ({ ...p, y: p.y + 1 })
};