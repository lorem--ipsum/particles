import { Vector } from './vector';
import { Particle } from './particle';
import { Attractor } from './attractor';

import nanOr from '../utils/nan-or';

export class Emitter {

  public position: Vector;
  public radius: number;
  public particles: Particle[];
  public spread: number;
  public angle: number;
  public initialVelocity: number;

  constructor(params?: any) {
    this.position = params.position || new Vector();
    this.particles = [];
    this.spread = nanOr(params.spread, Math.PI / 4);
    this.angle = nanOr(params.angle, 0);
    this.initialVelocity = nanOr(params.initialVelocity, 20);
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

  update = (newParticlesCount = 1, attractors: Attractor[] = []) => {
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
