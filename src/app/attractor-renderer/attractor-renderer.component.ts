import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Attractor, Vector } from '../../models/index';

@Component({
  selector: '[app-attractor-renderer]',
  templateUrl: './attractor-renderer.component.html',
  styleUrls: ['./attractor-renderer.component.css']
})
export class AttractorRendererComponent implements OnInit {

  @Input() attractor: Attractor;

  positionStartingPoint: Vector;

  constructor() { }

  ngOnInit() {
  }

  onMouseDown(e: MouseEvent) {
    this.positionStartingPoint = new Vector({x: e.layerX, y: e.layerY});
  }

  @HostListener('document:mousemove', ['$event'])
  onGlobalMouseMove(e) {
    const newPoint = new Vector({x: e.layerX, y: e.layerY});

    if (this.positionStartingPoint) {
      this.attractor.position
        .add(newPoint.copy().subtract(this.positionStartingPoint));

      this.positionStartingPoint = newPoint;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onGlobalMouseUp(e: MouseEvent) {
    this.positionStartingPoint = null;
  }

  onClick() {

  }

  getMass() {
    return Math.abs(this.attractor.mass);
  }

}
