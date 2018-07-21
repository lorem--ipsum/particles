import { Vector } from './vector';
import { Particle } from './particle';

import nanOr from '../utils/nan-or';

const G = 0.1;

export class Attractor {
  public position: Vector;

  public pulseFrequency = 0;

  private _originalMass = 1;
  private _mass: number;

  constructor(params: any) {
    this.position = params.position || new Vector();
    this.pulseFrequency = nanOr(params.pulseFrequency, 0);
    this._originalMass = nanOr(params.mass, 1);
    this._mass = this._originalMass;
  }

  update(index: number) {
    if (this.pulseFrequency === 0) return;
    this._mass = Math.sin(this.pulseFrequency / 100 * index) * this._originalMass;
  }

  get mass() {
    return this._mass;
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
    // ctx.arc(this.position.x, this.position.y, Math.abs(this._mass), 0, Math.PI * 2);
    ctx.stroke();
  }
}
