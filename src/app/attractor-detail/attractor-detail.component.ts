import { Component, OnInit, Input } from '@angular/core';
import { Attractor } from '../../models/index';

@Component({
  selector: 'app-attractor-detail',
  templateUrl: './attractor-detail.component.html',
  styleUrls: ['./attractor-detail.component.css']
})

export class AttractorDetailComponent implements OnInit {
  @Input() attractor: Attractor;

  constructor() { }

  ngOnInit() {
  }

}
