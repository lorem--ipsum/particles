import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

import { Emitter, Vector, Attractor } from '../models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  emitters: Emitter[] = [];
  attractors: Attractor[] = [];
  intervalId = undefined;
  leaps = 2;
  counter = 0;
  zone: NgZone;

  constructor(zone: NgZone) {
    this.zone = zone;
  }

  ngOnInit() {
    this.emitters = [
      new Emitter({
        position: new Vector({x: 250, y: 250}),
        spread: Math.PI / 6,
        angle: 0
      })
    ];

    this.attractors = [
      new Attractor({
        mass: 10,
        position: new Vector({x: 350, y: 250}),
        pulseFrequency: 10
      }),
    ];

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
    this.attractors = this.attractors.concat();

    this.emitters.forEach(e => e.update(10, this.attractors));
    this.emitters = this.emitters.concat();
  }
}
