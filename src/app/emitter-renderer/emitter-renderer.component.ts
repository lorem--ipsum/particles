import { Component, OnInit, Input } from '@angular/core';

import { Emitter } from '../../models/index';

@Component({
  selector: '[app-emitter-renderer]',
  templateUrl: './emitter-renderer.component.html',
  styleUrls: ['./emitter-renderer.component.css']
})
export class EmitterRendererComponent implements OnInit {

  @Input() emitter: Emitter;

  constructor() {
    // console.log('cons')
  }

  ngOnInit() {
  }

}
