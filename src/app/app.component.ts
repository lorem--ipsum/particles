import { PathLocationStrategy,  Location, LocationStrategy } from '@angular/common';
import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';

import { Emitter, Vector, Attractor, Particle } from '../models/index';

@Component({
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnChanges {
  location: Location;

  emitters: Emitter[] = [];
  attractors: Attractor[] = [];
  particles: Particle[] = [];

  leaps = 1;
  counter = 0;

  selectedEmitter: Emitter;
  selectedAttractor: Attractor;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnChanges() {
    const o = {
      emitters: this.emitters.map(e => e.toJS()),
      attractors: this.attractors.map(a => a.toJS()),
    };

    console.log(JSON.stringify(o))
  }

  ngOnInit() {
    this.emitters = [
      new Emitter({
        position: new Vector({x: 150, y: 250}),
        spread: 'pi / 4',
        angle: 0,
        emissionRate: 't % 10 == 0',
        batchSize: 3
      })
    ];

    this.attractors = [
      new Attractor({
        mass: 'sin(t / 20) * 20',
        position: new Vector({x: 350, y: 250}),
      })
    ];

    this.selectedEmitter = this.emitters[0];

    requestAnimationFrame(this.startUpdate);
  }

  startUpdate = () => {
    if (this.counter % this.leaps === 0) {
      this.update();
    }

    this.counter++;
    requestAnimationFrame(this.startUpdate);
  }

  update() {
    this.attractors.forEach(a => a.update(this.counter));

    const newParticles: Particle[] = [];

    this.emitters.forEach(e => newParticles.push(...e.update(this.counter)));

    const n = this.particles.length;

    for (let i = 0; i < n; i++) {
      const p = this.particles[i];

      if (p.position.x > 500 || p.position.y > 500) continue;
      if (p.isDead()) continue;

      newParticles.push(p);
      p.update(this.attractors);
    }

    this.particles = newParticles;
  }

  onAttractorClick(attractor: Attractor) {
    this.selectedAttractor = attractor;
    this.selectedEmitter = undefined;
  }

  onEmitterClick(emitter: Emitter) {
    this.selectedEmitter = emitter;
    this.selectedAttractor = undefined;
  }
}
