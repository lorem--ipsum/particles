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
  leaps = 1;
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
      new Attractor({mass: -1, position: new Vector({x: 350, y: 250})}),
    ];

    requestAnimationFrame(this.startUpdate);
  }

  startUpdate = () => {
    if (this.counter % this.leaps === 0) {
      this.updateEmitters();
    }

    this.counter++;
    requestAnimationFrame(this.startUpdate);
  }

  updateEmitters = () => {
    this.emitters.forEach(e => e.update(3, this.attractors));
    this.emitters = this.emitters.concat();
  }
}
