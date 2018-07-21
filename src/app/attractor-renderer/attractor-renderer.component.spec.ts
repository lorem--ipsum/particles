import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractorRendererComponent } from './attractor-renderer.component';

describe('AttractorRendererComponent', () => {
  let component: AttractorRendererComponent;
  let fixture: ComponentFixture<AttractorRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractorRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractorRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
