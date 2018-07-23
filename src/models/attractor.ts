import * as math from 'mathjs';

import { Vector, VectorJS } from './vector';
import { Particle } from './particle';
import { Drawable } from './drawable';
import { Diffable } from './diffable';

import { ValueExpression } from '../utils/value-expression';

const G = 0.1;

export interface AttractorValue {
  position?: Vector;
  mass?: string | number;
}

export interface AttractorJS {
  position?: VectorJS;
  mass?: string;
}

export class Attractor implements Drawable, Diffable {
  public position: Vector;

  public mass: ValueExpression;

  public time = 0;

  static fromJS(js: AttractorJS) {
    return new Attractor({
      position: Vector.fromJS(js.position),
      mass: js.mass
    });
  }

  constructor(params: AttractorValue) {
    this.position = params.position || Vector.ORIGIN();
    this.mass = new ValueExpression(params.mass);
  }

  identify() {
    return JSON.stringify(this.toJS());
  }

  toJS(): AttractorJS {
    return {
      position: this.position.toJS(),
      mass: this.mass.expression
    };
  }

  getMass(): number {
    return this.mass.value;
  }

  update(index: number) {
    this.time = index;
    this.mass.update({t: this.time});
  }

  getAttractionForce(p: Particle): {x: number, y: number} {
    const mass = this.getMass();

    let x = this.position.x - p.position.x;
    let y = this.position.y - p.position.y;

    const squaredMag = x * x + y * y;
    const mag = Math.sqrt(squaredMag);

    if (mag < mass) {
      p.kill();
      return {x: 0, y: 0};
    }

    const strength = (G * mass * p.mass) / squaredMag;

    x = strength * x / mag;
    y = strength * y / mag;

    return {x, y};
  }

  drawOn(ctx: CanvasRenderingContext2D) {
    // ctx.strokeStyle = 'rgba(211, 211, 211, 1.00)';
    // ctx.beginPath();
    // ctx.arc(this.position.x, this.position.y, Math.abs(this.mass), 0, Math.PI * 2);
    // ctx.stroke();
  }
}
