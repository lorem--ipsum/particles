import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Component, OnInit, Input, OnChanges, DoCheck, IterableDiffer, IterableDiffers } from '@angular/core';
import { Attractor, Emitter, Diffable } from '../../models/index';

function track(index: number, item: Diffable) {
  return item.identify();
}

@Component({
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  selector: 'app-state-saver',
  templateUrl: './state-saver.component.html',
  styleUrls: ['./state-saver.component.scss']
})
export class StateSaverComponent implements DoCheck {
  private _emitters: Diffable[] = [];
  private _attractors: Diffable[] = [];

  @Input()
  set emitters(value: Diffable[]) {
    this._emitters = value;
    this._emittersDiffer = this._iterableDiffers.find(value).create(track);
  }

  @Input()
  set attractors(value: Diffable[]) {
    this._attractors = value;
    this._attractorsDiffer = this._iterableDiffers.find(value).create(track);
  }

  private _emittersDiffer: IterableDiffer<Diffable>;
  private _attractorsDiffer: IterableDiffer<Diffable>;

  constructor(private _iterableDiffers: IterableDiffers, private _location: Location) {
  }

  ngDoCheck() {
    let hasChanged = false;

    if (this._emittersDiffer) {
      if (this._emittersDiffer.diff(this._emitters)) hasChanged = true;
    }

    if (this._attractorsDiffer) {
      if (this._attractorsDiffer.diff(this._attractors)) hasChanged = true;
    }

    if (hasChanged) this.saveState();
  }

  saveState() {
    const string = JSON.stringify({
      attractors: this._attractors.map(a => a.toJS()),
      emitters: this._emitters.map(a => a.toJS())
    });

    location.hash = btoa(string);
  }

}
