'use strict';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const KEY = {
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    P: 80
  }
//Object.freeze(KEY);

const COLORS = [
    'blue',
    'darkblue',
    'orange',
    'yellow',
    'green',
    'red',
    'magenta'
]

const SHAPES = [
    [ // I
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [ // J
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [ // L
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [ // O
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [ // S
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [ // Z
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [ // T
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
]

function drawBlock(ctx, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
}

function pickRandom() {
    let arr = [0, 1, 2, 3, 4, 5, 6];
    let out = [];
    let pick;

    while(arr.length > 0) {
        pick = Math.random() * arr.length;
        out.push(arr.splice(pick, 1)[0])
    }
    return out;
}