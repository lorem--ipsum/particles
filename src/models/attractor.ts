import { Vector } from './vector';
import { Particle } from './particle';

import nanOr from '../utils/nan-or';

const G = 2;

export class Attractor {
  public position: Vector;
  public mass = 1;

  constructor(params: any) {
    this.position = params.position || new Vector();
    this.mass = nanOr(params.mass, 1);
  }

  getAttractionForce(p: Particle): Vector {
    const force = this.position
      .copy()
      .subtract(p.position)
      ;

    const distance = force.getMagnitude();

    const strength = (G * this.mass * p.mass) / (distance * distance);

    return force.normalize().multiply(strength);
  }

  drawOn(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'rgba(211, 211, 211, 1.00)';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, Math.abs(this.mass), 0, Math.PI * 2);
    ctx.stroke();
  }
}
