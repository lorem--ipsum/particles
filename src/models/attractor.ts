import * as math from 'mathjs';

import { Vector } from './vector';
import { Particle } from './particle';

import nanOr from '../utils/nan-or';

const G = 0.1;

export class Attractor {
  public position: Vector;

  private _massExpression: string;
  private _parsedMass: math.MathNode;

  public time = 0;

  constructor(params: any) {
    this.position = params.position || new Vector();
    this.massExpression = params.mass;
  }

  get mass(): number {
    return this._parsedMass.eval({i: this.time});
  }

  public get massExpression(): string {
    return this._massExpression;
  }

  public set massExpression(v: string) {
    try {
      const p = math.parse(v);
      p.eval({i: 0});
      this._massExpression = v;
      this._parsedMass = p;
    } catch (e) {}
  }

  update(index: number) {
    this.time = index;
  }

  getAttractionForce(p: Particle): Vector {
    const force = this.position
      .copy()
      .subtract(p.position)
      ;

    const distance = force.getMagnitude();

    if (distance < this.mass) {
      p.kill();
      return new Vector({x: 0, y: 0});
    }

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
