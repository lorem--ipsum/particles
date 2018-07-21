import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Emitter } from '../../models/index';

@Component({
  selector: 'app-emitter-detail',
  templateUrl: './emitter-detail.component.html',
  styleUrls: ['./emitter-detail.component.css']
})
export class EmitterDetailComponent implements OnInit, OnChanges {

  @Input() emitter: Emitter;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
