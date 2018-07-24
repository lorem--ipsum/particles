import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

import { Emitter } from '../../models/index';

@Component({
  selector: 'app-emitter-detail',
  templateUrl: './emitter-detail.component.html',
  styleUrls: ['./emitter-detail.component.scss']
})
export class EmitterDetailComponent {
  @Input() emitter: Emitter;
  @Output() remove = new EventEmitter<Emitter>();
  @Output() duplicate = new EventEmitter<Emitter>();
}
