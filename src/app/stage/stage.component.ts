import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { Drawable } from '../../models/index';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})

export class StageComponent implements OnInit, OnChanges {
  @Input() width = 200;
  @Input() height = 200;

  @Input() drawables: Drawable[] = [];

  @ViewChild('myCanvas') canvasRef: ElementRef;

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
    this.drawables.forEach(drawable => drawable.drawOn(ctx));
  }
}
