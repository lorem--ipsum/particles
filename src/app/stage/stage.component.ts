import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { Emitter, Particle, Attractor } from '../../models/index';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})

export class StageComponent implements OnInit, OnChanges {
  @Input() width = 200;
  @Input() height = 200;

  @Input() emitters: Emitter[] = [];
  @Input() attractors: Attractor[] = [];

  @ViewChild('myCanvas') canvasRef: ElementRef;

  @Output() attractorClick = new EventEmitter<Attractor>();
  @Output() emitterClick = new EventEmitter<Emitter>();

  constructor() { }

  ngOnInit() {
    this.clear();
    this.draw();
  }

  ngOnChanges() {
    this.clear();
    this.draw();
  }

  clear() {
    this.canvasRef.nativeElement.width = this.width;
    this.canvasRef.nativeElement.height = this.height;
  }

  draw() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');

    this.emitters.forEach(emitter => emitter.drawOn(ctx));
    this.attractors.forEach(attractor => attractor.drawOn(ctx));
  }
}
