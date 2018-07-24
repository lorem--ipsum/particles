import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attractor } from '../../models/index';

@Component({
  selector: 'app-attractor-detail',
  templateUrl: './attractor-detail.component.html',
  styleUrls: ['./attractor-detail.component.scss']
})

export class AttractorDetailComponent {
  @Input() attractor: Attractor;
  @Output() remove = new EventEmitter<Attractor>();
  @Output() duplicate = new EventEmitter<Attractor>();
}
