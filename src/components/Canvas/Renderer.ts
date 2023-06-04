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
    // Draw the whole screen as damage zone
    this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    // Draw safe zones
    //TODO: get game state's flex properties to get array of mapping fns
    const safeZones: [number, number, number, number][] = [
      [
        this.ctx.canvas.width / 2 - 50,
        this.ctx.canvas.height / 2 - 50,
        this.ctx.canvas.width / 4,
        this.ctx.canvas.height / 4,
      ],
      [
        this.ctx.canvas.width / 2 - 200,
        this.ctx.canvas.height / 2 - 100,
        this.ctx.canvas.width / 4,
        this.ctx.canvas.height / 4,
      ],
      [
        this.ctx.canvas.width / 2 + 200,
        this.ctx.canvas.height / 2 - 150,
        this.ctx.canvas.width / 4,
        this.ctx.canvas.height / 4,
      ],
    ];
    this.ctx.fillStyle = 'white';
    this.ctx.filter = 'blur(10px)';
    safeZones.forEach(([x, y, width, height]) => {
      this.ctx.save();
      this.ctx.fillRect(x, y, width, height);
      this.ctx.globalCompositeOperation = 'lighten';
      const gradient = this.ctx.createLinearGradient(x, y, x, y + height);
      gradient.addColorStop(0, 'grey');
      gradient.addColorStop(1, 'transparent');
      this.ctx.fillStyle = gradient;
      this.ctx.translate(0, height);
      this.ctx.fillRect(x, y, width, height);
      this.ctx.restore();
    });
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
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 360);
    this.ctx.fill();
    if (this.x > this.ctx.canvas.offsetWidth) this.dx = -1;
    if (this.x < 0) this.dx = 1;
    this.x += this.speed * this.dx;
    if (this.y > this.ctx.canvas.offsetHeight) this.dy = -1;
    if (this.y < 0) this.dy = 1;
    this.y += this.speed * this.dy;
  }
}
