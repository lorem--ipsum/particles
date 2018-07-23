import { Vector } from './vector';
import { Attractor } from './attractor';
import { Drawable } from './drawable';

import nanOr from '../utils/nan-or';

const LIFE_SPAN = 500;

export class Particle implements Drawable {
  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;
  public lifeSpan: number;
  public color: [number, number, number];
  public mass = 1;

  constructor(params: any) {
    this.position = params.position || Vector.ORIGIN();
    this.velocity = params.velocity || Vector.ORIGIN();
    this.acceleration = params.acceleration || Vector.ORIGIN();
    this.lifeSpan = nanOr(params.lifeSpan, LIFE_SPAN);
    this.color = params.color || [172, 207, 165];
  }

  update(attractors: Attractor[] = []) {
    this.lifeSpan = this.lifeSpan - 1;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    let i = attractors.length;
    while (i--) {
      const f = attractors[i].getAttractionForce(this);
      this.acceleration.x += f.x;
      this.acceleration.y += f.y;
    }
  }

  kill() {
    this.lifeSpan = 0;
  }

  isDead() {
    return this.lifeSpan <= 0 || this.position.x < 0 || this.position.y < 0;
  }

  getOpacity() {
    return this.lifeSpan / LIFE_SPAN;
  }

  applyForce(force: Vector) {
    this.acceleration.add(force);
  }

  drawOn(ctx: CanvasRenderingContext2D) {
    const position = this.position;

    ctx.fillStyle = `rgb(${this.color.join(',')}, ${this.getOpacity()})`;
    ctx.beginPath();
    ctx.fillRect(position.x - 1, position.y - 1, 2, 2);
    // ctx.arc(position.getX(), position.getY(), this.getMass(), 0, Math.PI * 2);
    ctx.fill();
  }
}
