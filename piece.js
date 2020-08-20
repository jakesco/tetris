class Piece {
    shape;
    color;
    ctx;
    xPos = 3;
    yPos = 0;
    xOff = 0;
    yOff = -2;
    constructor(ctx, shapeType){
        this.ctx = ctx;
        this.shape = P_SHAPE[shapeType];
        this.color = P_COLOR[shapeType];
    }

    draw() {
        for(let i = 0; i < this.shape.length; i++) {
            if(this.shape[i] > 0) {
                drawBlock(this.ctx, this.color, 
                    this.xPos + (i % 5) + this.xOff,
                    this.yPos + parseInt(i / 5) + this.yOff
                );
            }
        }
    }

    rotate() {
        
    }
}