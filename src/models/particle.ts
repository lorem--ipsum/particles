import { Vector } from './vector';
import { Attractor } from './attractor';

import nanOr from '../utils/nan-or';

const LIFE_SPAN = 500;

export class Particle {
  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;
  public lifeSpan: number;
  public color: [number, number, number];
  public mass = 1;

  constructor(params: any) {
    this.position = params.position || new Vector();
    this.velocity = params.velocity || new Vector();
    this.acceleration = params.acceleration || new Vector({x: 0, y: 0});
    this.lifeSpan = nanOr(params.lifeSpan, LIFE_SPAN);
    this.color = params.color || [172, 207, 165];
  }

  update(attractors: Attractor[] = []) {
    this.lifeSpan = this.lifeSpan - 1;
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    attractors.forEach(attractor => {
      this.acceleration.add(attractor.getAttractionForce(this));
    });
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
