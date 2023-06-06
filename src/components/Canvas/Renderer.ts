// TODO: Create object or class that is initialized with frame rate
// TODO: provide helper functions for:
// easing
// determining when to start/stop animations

export class Renderer {
  ctx: CanvasRenderingContext2D;
  gameObjects: GameObject[];
  constructor(ctx: CanvasRenderingContext2D, gameObjects: GameObject[]) {
    this.ctx = ctx;
    this.gameObjects = gameObjects;
  }
  // TODO: pass in frame as number
  render(): number {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.gameObjects.forEach((obj) => obj.draw());
    return requestAnimationFrame(this.render.bind(this));
  }
  // TODO:
  // updateState(state: GameState) {
  //   this.gameObjects.forEach((obj) => obj.update(state));
  // }
  addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }
}

abstract class GameObject {
  // TODO: pass something to draw so it can know the frame it's on
  abstract draw(): void;
  // abstract updateState(): void;
}

const svgFilterDefs = new URL('../../assets/blobFilter.svg', import.meta.url)
  .href;

export class Obstacle extends GameObject {
  collisionNodes: NodeListOf<ChildNode>;
  ctx: CanvasRenderingContext2D;
  constructor(
    ctx: CanvasRenderingContext2D,
    collisionNodes: NodeListOf<ChildNode>
  ) {
    super();
    this.collisionNodes = collisionNodes;
    this.ctx = ctx;
  }
  draw() {
    // Save state of context
    this.ctx.save();

    // Draw safe zones
    //TODO: get game state's flex properties to get array of mapping fns
    const safeZones: [number, number, number, number][] = [
      [
        this.ctx.canvas.width / 2 - 50,
        this.ctx.canvas.height / 2 - 50,
        this.ctx.canvas.width / 5,
        this.ctx.canvas.height / 6,
      ],
      [
        this.ctx.canvas.width / 2 - 200,
        this.ctx.canvas.height / 2 - 100,
        this.ctx.canvas.width / 5,
        this.ctx.canvas.height / 6,
      ],
      [
        this.ctx.canvas.width / 2 + 200,
        this.ctx.canvas.height / 2 - 150,
        this.ctx.canvas.width / 5,
        this.ctx.canvas.height / 6,
      ],
    ];

    this.ctx.filter = `url(${svgFilterDefs}#blob)`;
    const path = new Path2D();

    safeZones.forEach(([x, y, width, height]) => {
      path.rect(x, y, width, height);
    });
    // Draw platform top
    this.ctx.fillStyle = 'hsl(215 60% 85%)';
    this.ctx.fill(path);
    // Draw platform bottom
    this.ctx.globalCompositeOperation = 'destination-over';
    this.ctx.fillStyle = 'hsl(215 60% 37%)';
    this.ctx.translate(0, 20);
    this.ctx.fill(path);

    // Restore state
    this.ctx.restore();
  }
}

export class Dot extends GameObject {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed = 5;
  collisionNodes: NodeListOf<ChildNode>;
  ctx: CanvasRenderingContext2D;
  constructor(
    ctx: CanvasRenderingContext2D,
    collisionNodes: NodeListOf<ChildNode>
  ) {
    super();
    this.ctx = ctx;
    this.collisionNodes = collisionNodes;
    this.x = Math.round(Math.random() * this.ctx.canvas.offsetWidth);
    this.y = Math.round(Math.random() * this.ctx.canvas.offsetHeight);
    this.dx = Math.random() > 0.5 ? 1 : -1;
    this.dy = Math.random() > 0.5 ? 1 : -1;
  }
  draw(): void {
    let isCollision = false;
    this.collisionNodes.forEach((child) => {
      if (!(child instanceof HTMLElement)) return;
      if (
        this.x > child.offsetLeft &&
        this.x < child.offsetLeft + child.offsetWidth &&
        this.y > child.offsetTop &&
        this.y < child.offsetHeight + child.offsetTop
      )
        isCollision = true;
    });
    this.ctx.fillStyle = isCollision ? '#FF0000' : '#FFFFFF';
    const dotPath = new Path2D();
    dotPath.arc(this.x, this.y, 5, 0, 360);
    // Draw shadow
    this.ctx.save();
    this.ctx.translate(0, 15);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fill(dotPath);
    this.ctx.restore();
    // Draw ball
    this.ctx.fill(dotPath);
    if (this.x > this.ctx.canvas.offsetWidth) this.dx = -1;
    if (this.x < 0) this.dx = 1;
    this.x += this.speed * this.dx;
    if (this.y > this.ctx.canvas.offsetHeight) this.dy = -1;
    if (this.y < 0) this.dy = 1;
    this.y += this.speed * this.dy;
  }
}
