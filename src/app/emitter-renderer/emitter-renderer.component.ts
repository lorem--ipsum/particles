import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';

import { Emitter, Vector } from '../../models/index';
import { arc } from '../../utils/svg';

const KNOB_PADDING = 10;

@Component({
  selector: '[app-emitter-renderer]',
  templateUrl: './emitter-renderer.component.html',
  styleUrls: ['./emitter-renderer.component.css']
})
export class EmitterRendererComponent implements OnInit, OnChanges {

  @Input() emitter: Emitter;

  positionStartingPoint: Vector;
  angleStartingPoint: Vector;

  constructor() {
  }

  getHandlePath() {
    const { position, angle, initialVelocity } = this.emitter;

    const end = position.copy().add(Vector.fromPolar({r: initialVelocity + KNOB_PADDING, theta: angle}));

    return [
      'M', position.x, position.y,
      'L', end.x, end.y
    ].join(' ');
  }

  getKnobPosition() {
    const { position, angle, initialVelocity } = this.emitter;

    return position.copy().add(Vector.fromPolar({r: initialVelocity + KNOB_PADDING, theta: angle}));
  }

  getArc() {
    const { position, spread, angle, initialVelocity } = this.emitter;
    return arc(position, initialVelocity, angle - spread / 2, angle + spread / 2);
  }

  ngOnInit() {

  }

  onMouseDown(e: MouseEvent) {
    this.positionStartingPoint = new Vector({x: e.layerX, y: e.layerY});
  }

  @HostListener('document:mousemove', ['$event'])
  onGlobalMouseMove(e) {
    const newPoint = new Vector({x: e.layerX, y: e.layerY});

    if (this.positionStartingPoint) {
      this.emitter.position
        .add(newPoint.copy().subtract(this.positionStartingPoint));

      this.positionStartingPoint = newPoint;

    } else if (this.angleStartingPoint) {

      const { r, theta } = newPoint.subtract(this.emitter.position).toPolar();

      this.emitter.angle = theta;
      this.emitter.initialVelocity = r - KNOB_PADDING;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onGlobalMouseUp(e: MouseEvent) {
    this.positionStartingPoint = null;
    this.angleStartingPoint = null;
  }

  onHandleDown(e: MouseEvent) {
    this.angleStartingPoint = new Vector({x: e.layerX, y: e.layerY});
  }

  onMouseEnter() {
    console.log('enter')
  }

  onMouseLeave() {
    console.log('leave')
  }

  onClick() {
    console.log('click')
  }

  ngOnChanges() {
  }

}
