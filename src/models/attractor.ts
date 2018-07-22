import * as math from 'mathjs';

import { Vector, VectorJS } from './vector';
import { Particle } from './particle';
import { Drawable } from './drawable';

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

export class Attractor implements Drawable {
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

  toJS(): AttractorJS {
    return {
      position: this.position.toJS(),
      mass: this.mass.expression
    };
  }

  getMass(): number {
    return this.mass.eval({t: this.time});
  }

  update(index: number) {
    this.time = index;
  }

  getAttractionForce(p: Particle): Vector {
    const mass = this.getMass();
    const force = this.position
      .copy()
      .subtract(p.position)
      ;

    const distance = force.getMagnitude();

    if (distance < mass) {
      p.kill();
      return new Vector({x: 0, y: 0});
    }

    const strength = (G * mass * p.mass) / (distance * distance);

    return force.normalize().multiply(strength);
  }

  drawOn(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'rgba(211, 211, 211, 1.00)';
    ctx.beginPath();
    // ctx.arc(this.position.x, this.position.y, Math.abs(this.mass), 0, Math.PI * 2);
    ctx.stroke();
  }
}
