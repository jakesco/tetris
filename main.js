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
        time.start = now;
    }

    // Clear board before drawing new state.
    ctxBoard.clearRect(0, 0, ctxBoard.canvas.width, ctxBoard.canvas.height);

    b.draw();

    requestId = requestAnimationFrame(animate);
}

function addEventListener() {
    document.addEventListener('keydown', event => {
        event.preventDefault();
        // Get new state
        if (event.keyCode === KEY.LEFT) {
            b.left();
        } else if (event.keyCode === KEY.RIGHT) {
            b.right();
        } else if (event.keyCode === KEY.DOWN) {
            b.drop();
        }
      }
    );
}

moves = {
    [KEY.LEFT]:  p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
    [KEY.UP]:    p => ({ ...p, y: p.y + 1 })
  };