import * as math from 'mathjs';

import { Vector } from './vector';
import { Particle } from './particle';
import { Attractor } from './attractor';

import nanOr from '../utils/nan-or';

export class Emitter {
  public position: Vector;
  private _angleExpression: string;
  private _spreadExpression: string;
  private _velocityExpression: string;

  public pouet: string;

  public time = 0;

  public particles: Particle[];

  constructor(params?: any) {
    this.position = params.position || new Vector();
    this.particles = [];
    this.angleExpression = params.angle;
    this.spreadExpression = params.spread;
    this._velocityExpression = params.initialVelocity || '20';
  }

  get angle(): number {
    return math.parse(this.angleExpression).eval({i: this.time});
  }

  public get angleExpression(): string {
    return this._angleExpression;
  }

  public set angleExpression(v: string) {
    try {
      math.parse(v).eval({i: 0});
      this._angleExpression = v;
    } catch (e) {}
  }

  get spread(): number {
    return math.parse(this.spreadExpression).eval({i: this.time});
  }

  public get spreadExpression(): string {
    return this._spreadExpression;
  }

  public set spreadExpression(v: string) {
    try {
      math.parse(v).eval({i: 0});
      this._spreadExpression = v;
    } catch (e) {}
  }

  get initialVelocity(): number {
    return math.parse(this.velocityExpression).eval({i: this.time});
  }

  public get velocityExpression(): string {
    return this._velocityExpression;
  }

  public set velocityExpression(v: string) {
    try {
      math.parse(v).eval({i: 0});
      this._velocityExpression = v;
    } catch (e) {}
  }

  getNewParticle(index: number, count: number) {
    const velocity = Vector.fromPolar({
      r: this.initialVelocity / 20,
      theta: this.angle - this.spread / 2 + (this.spread / count) * index
    });

    return new Particle({
      position: this.position.copy(),
      velocity
    });
  }

  getNozzlePosition() {
    return Vector.fromPolar({r: this.initialVelocity, theta: this.angle});
  }

  update = (time: number, newParticlesCount = 1, attractors: Attractor[] = []) => {
    this.time = time;

    for (let i = 0; i < newParticlesCount; i++) {
      this.particles.push(this.getNewParticle(i, newParticlesCount));
    }

    const newParticles: Particle[] = [];

    const n = this.particles.length;

    for (let i = 0; i < n; i++) {
      const p = this.particles[i];
      if (p.isDead()) continue;
      newParticles.push(p);
      p.update(attractors);
    }

    this.particles = newParticles;
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

    this.particles.forEach(p => p.drawOn(ctx));
  }
}
