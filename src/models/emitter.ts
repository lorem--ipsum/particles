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
    this.radius = nanOr(params.radius, 1);
    this.particles = [];
    this.spread = nanOr(params.spread, Math.PI / 4);
    this.angle = nanOr(params.angle, 0);
    this.initialVelocity = nanOr(params.initialVelocity, 1);
  }

  getNewParticle() {
    const velocity = Vector.fromPolar({r: this.initialVelocity, theta: this.angle - this.spread / 2 + Math.random() * this.spread});

    return new Particle({
      position: this.position.copy(),
      velocity
    });
  }

  update = (newParticles = 1, attractors: Attractor[] = []) => {
    for (let i = 0; i < newParticles; i++) {
      this.particles.push(this.getNewParticle());
    }

    this.particles.forEach(p => p.update(attractors));

    this.particles = this.particles.filter(p => !p.isDead());
  }

  drawOn(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'rgba(211, 211, 211, 1.00)';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    this.particles.forEach(p => p.drawOn(ctx));
  }
}
