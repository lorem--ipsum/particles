import { PathLocationStrategy, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Component, OnInit, OnDestroy, OnChanges, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';

import { Emitter, Vector, Attractor, Particle } from '../models/index';

@Component({
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  emitters: Emitter[] = [];
  attractors: Attractor[] = [];
  particles: Particle[] = [];

  leaps = 1;
  counter = 0;

  selectedEmitter: Emitter;
  selectedAttractor: Attractor;

  before = Date.now();
  now: number;
  fps = 0;

  showStuff = true;

  constructor(private _location: Location) {}

  addEmitter() {
    this.emitters.push(new Emitter({
      position: new Vector({x: 50, y: 50}),
    }));
  }

  removeAttractor(attractor: Attractor) {
    this.attractors = this.attractors.filter(a => a !== attractor);
    if (this.selectedAttractor === attractor) this.selectedAttractor = null;
  }

  removeEmitter(emitter: Emitter) {
    this.emitters = this.emitters.filter(e => e !== emitter);
    if (this.selectedEmitter === emitter) this.selectedEmitter = null;
  }

  duplicateAttractor(attractor: Attractor) {
    this.attractors.push(Attractor.fromJS(attractor.toJS()));
    this.selectedAttractor = this.attractors[this.attractors.length - 1];
  }

  duplicateEmitter(emitter: Emitter) {
    this.emitters.push(Emitter.fromJS(emitter.toJS()));
    this.selectedEmitter = this.emitters[this.emitters.length - 1];
  }

  addAttractor() {
    this.attractors.push(new Attractor({
      mass: 'sin(t / 50) * 20',
      position: new Vector({x: 50, y: 50}),
    }));
  }

  reset() {
    this._location.go('');
    this.particles = [];
    this.counter = 0;

    const { emitters, attractors } = this.getDefault();
    this.emitters = emitters;
    this.attractors = attractors;
  }

  getDefault() {
    return {
      emitters: [
        new Emitter({
          position: new Vector({x: 50, y: 250}),
          spread: 'pi / 4',
          angle: 0,
          emissionRate: 't % 2 == 0',
          batchSize: 6,
          color: '[sin(t / 100)*255, 80, 70]'
        }),
        new Emitter({
          position: new Vector({x: 450, y: 250}),
          spread: 'pi / 4',
          angle: 'pi',
          emissionRate: 't % 2 == 0',
          batchSize: 6,
          color: '[sin(t / 100)*255, 80, 70]'
        })
      ],
      attractors: [
        new Attractor({
          mass: 'sin(t / 50) * 20',
          position: new Vector({x: 250, y: 250}),
        })
      ]
    };
  }

  ngOnInit() {
    const path = this._location.path();

    try {
      const { emitters, attractors } = JSON.parse(atob(path));
      this.emitters = emitters.map(e => Emitter.fromJS(e));
      this.attractors = attractors.map(a => Attractor.fromJS(a));
    } catch (e) {
      const { emitters, attractors } = this.getDefault();
      this.emitters = emitters;
      this.attractors = attractors;
    }

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
    // FPS
    this.now = Date.now();
    this.fps = Math.round(1000 / (this.now - this.before));
    this.before = this.now;

    this.attractors.forEach(a => a.update(this.counter));

    const newParticles: Particle[] = [];

    this.emitters.forEach(e => newParticles.push(...e.update(this.counter)));

    let i = this.particles.length;
    while (i--) {
      const p = this.particles[i];

      if (p.position.x > 500 || p.position.y > 500) continue;
      if (p.isDead()) continue;

      newParticles.push(p);
      p.update(this.attractors);
    }

    this.particles = newParticles;
  }

  onAttractorClick(attractor: Attractor) {
    if (this.selectedAttractor === attractor) {
      this.selectedAttractor = undefined;
    } else {
      this.selectedAttractor = attractor;
    }

    this.selectedEmitter = undefined;
  }

  onEmitterClick(emitter: Emitter) {
    if (this.selectedEmitter === emitter) {
      this.selectedEmitter = undefined;
    } else {
      this.selectedEmitter = emitter;
    }
    this.selectedAttractor = undefined;
  }
}
