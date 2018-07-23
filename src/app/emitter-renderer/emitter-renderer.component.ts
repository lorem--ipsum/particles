import { Component, OnInit, Input, Output, OnChanges, HostListener } from '@angular/core';

import { Emitter, Vector } from '../../models/index';
import { arc } from '../../utils/svg';
import { ValueExpression } from '../../utils/value-expression';

const KNOB_PADDING = 10;

@Component({
  selector: '[app-emitter-renderer]',
  templateUrl: './emitter-renderer.component.html',
  styleUrls: ['./emitter-renderer.component.scss']
})
export class EmitterRendererComponent implements OnInit, OnChanges {

  @Input() emitter: Emitter;
  @Input() selected: boolean;

  positionStartingPoint: Vector;
  angleStartingPoint: Vector;

  constructor() {
  }

  getHandlePath() {
    const { position } = this.emitter;

    const end = position.copy().add(
      Vector.fromPolar({r: this.emitter.getInitialVelocity() + KNOB_PADDING, theta: this.emitter.getAngle()})
    );

    return [
      'M', position.x, position.y,
      'L', end.x, end.y
    ].join(' ');
  }

  getKnobPosition() {
    const { position } = this.emitter;

    return position.copy().add(Vector.fromPolar({r: this.emitter.getInitialVelocity() + KNOB_PADDING, theta: this.emitter.getAngle()}));
  }

  getArc() {
    const { position } = this.emitter;
    const spread = this.emitter.getSpread();
    const angle = this.emitter.getAngle();
    const initialVelocity = this.emitter.getInitialVelocity();

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

      this.emitter.angle = new ValueExpression(theta);
      this.emitter.velocity = new ValueExpression(r - KNOB_PADDING);
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
