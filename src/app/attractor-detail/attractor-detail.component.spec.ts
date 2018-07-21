import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractorDetailComponent } from './attractor-detail.component';

describe('AttractorDetailComponent', () => {
  let component: AttractorDetailComponent;
  let fixture: ComponentFixture<AttractorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
