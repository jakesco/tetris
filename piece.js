class Piece {
    shape;
    color;
    ctx;
    xPos = 3;
    yPos = 5;
    offset;
    constructor(ctx, shapeType) {
        this.ctx = ctx;
        this.shape = SHAPES[shapeType];
        this.color = COLORS[shapeType];
        this.offset = (shapeType === TYPES.I) || (shapeType === TYPES.O) ? 4 : 3;
    }

    draw() {
        this.shape.forEach((item, index) => {
            if (item > 0) {
                drawBlock(this.ctx, this.color,
                    this.xPos + (index % this.offset),
                    this.yPos + parseInt(index / this.offset));
            }
        });
    }

    down() {
        this.yPos += 1;
    }
}
