export class Renderer {
  // needs access to the position of the flex children
  frame: number;
  frameRate = 60;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.frame = 0;
  }
  draw() {
    // needs to update a requestFrameAnimation id
    // accept a closure?
    this.frame > this.frameRate ? (this.frame = 0) : this.frame++;
  }
  updateFrameRate(rate: number) {
    this.frameRate = rate;
  }
}
