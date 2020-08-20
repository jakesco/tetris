'use strict';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const TYPES = {
    I: 0,
    J: 1,
    L: 2,
    O: 3,
    S: 4,
    Z: 5,
    T: 6,
}

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
        0, 0, 0, 0,
        1, 1, 1, 1,
        0, 0, 0, 0,
        0, 0, 0, 0
    ],
    [ // J
        1, 0, 0,
        1, 1, 1,
        0, 0, 0
    ],
    [ // L
        0, 0, 1,
        1, 1, 1,
        0, 0, 0
    ],
    [ // O
        0, 0, 0, 0,
        0, 1, 1, 0,
        0, 1, 1, 0,
        0, 0, 0, 0
    ],
    [ // S
        0, 1, 1,
        1, 1, 0,
        0, 0, 0
    ],
    [ // Z
        1, 1, 0,
        0, 1, 1,
        0, 0, 0
    ],
    [ // T
        0, 1, 0,
        1, 1, 1,
        0, 0, 0
    ],
]

function drawBlock(ctx, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
}