import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitterRendererComponent } from './emitter-renderer.component';

describe('EmitterRendererComponent', () => {
  let component: EmitterRendererComponent;
  let fixture: ComponentFixture<EmitterRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmitterRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmitterRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
