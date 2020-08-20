
var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');
init();

let p = new Piece(ctx, P_TYPE.Z);
p.draw();

function drawBlock(ctx, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
}

function init() {
    ctx.canvas.width = COLS * BLOCK_SIZE;
    ctx.canvas.height = ROWS * BLOCK_SIZE;
}
