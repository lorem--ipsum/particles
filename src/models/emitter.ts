import * as math from 'mathjs';

import { Vector, VectorJS } from './vector';
import { Particle } from './particle';
import { Attractor } from './attractor';
import { Drawable } from './drawable';

import { ValueExpression } from '../utils/value-expression';

export interface EmitterValue {
  position?: Vector;
  angle?: string | number;
  spread?: string | number;
  initialVelocity?: string | number;
  batchSize?: string | number;
  emissionRate?: string | number;
}

export interface EmitterJS {
  position?: VectorJS;
  angle?: string;
  spread?: string;
  initialVelocity?: string;
  batchSize?: string;
  emissionRate: string;
}

export class Emitter implements Drawable {

  public position: Vector;

  public angle: ValueExpression;
  public spread: ValueExpression;
  public velocity: ValueExpression;
  public batchSize: ValueExpression;
  public emissionRate: ValueExpression;

  public time = 0;

  static fromJS(js: EmitterJS) {
    return new Emitter({
      position: Vector.fromJS(js.position),
      angle: js.angle,
      spread: js.spread,
      initialVelocity: js.initialVelocity,
      batchSize: js.batchSize,
      emissionRate: js.emissionRate
    });
  }

  constructor(params?: EmitterValue) {
    this.position = params.position || new Vector({x: 0, y: 0});

    this.angle = new ValueExpression(params.angle);
    this.spread = new ValueExpression(params.spread);
    this.velocity = new ValueExpression(params.initialVelocity || '20');
    this.batchSize = new ValueExpression(params.batchSize || '10');
    this.emissionRate = new ValueExpression(params.emissionRate || '1');
  }


  toJS(): EmitterJS {
    return {
      position: this.position.toJS(),
      angle: this.angle.expression,
      spread: this.spread.expression,
      batchSize: this.batchSize.expression,
      emissionRate: this.emissionRate.expression,
      initialVelocity: this.velocity.expression,
    };
  }

  getAngle(): number {
    return this.angle.eval({t: this.time});
  }

  getSpread(): number {
    return this.spread.eval({t: this.time});
  }

  getBatchSize(): number {
    return this.batchSize.eval({t: this.time});
  }

  getEmissionRate(): number {
    return this.emissionRate.eval({t: this.time});
  }

  getInitialVelocity(): number {
    return this.velocity.eval({t: this.time});
  }

  getNewParticle(index: number, count: number) {
    const initialVelocity = this.getInitialVelocity();
    const spread = this.getSpread();
    const angle = this.getAngle();

    const step = count > 1 ?  (spread / (count - 1)) * index : spread / 2;

    const velocity = Vector.fromPolar({
      r: initialVelocity / 20,
      theta: angle - spread / 2 + step
    });

    return new Particle({
      position: this.position.copy(),
      velocity
    });
  }

  getNozzlePosition() {
    return Vector.fromPolar({r: this.getInitialVelocity(), theta: this.getAngle()});
  }

  update(time: number): Particle[] {
    this.time = time;

    const rate = this.getEmissionRate();

    if (!rate) return [];

    const batchSize = this.getBatchSize();

    const newParticles: Particle[] = [];

    for (let i = 0; i < batchSize; i++) {
      newParticles.push(this.getNewParticle(i, batchSize));
    }

    return newParticles;
  }

  drawOn(ctx: CanvasRenderingContext2D) {
    const { x, y } = this.position;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();

    // ctx.moveTo(x, y - 10);
    // ctx.lineTo(x, y + 10);
    // ctx.moveTo(x + 10, y);
    // ctx.lineTo(x - 10, y);

    // ctx.arc(this.position.x, this.position.y, this.initialVelocity, 0, Math.PI * 2);
    ctx.stroke();
  }
}
