import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSaverComponent } from './state-saver.component';

describe('StateSaverComponent', () => {
  let component: StateSaverComponent;
  let fixture: ComponentFixture<StateSaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateSaverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
