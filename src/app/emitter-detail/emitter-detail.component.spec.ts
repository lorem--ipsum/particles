import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitterDetailComponent } from './emitter-detail.component';

describe('EmitterDetailComponent', () => {
  let component: EmitterDetailComponent;
  let fixture: ComponentFixture<EmitterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmitterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmitterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
