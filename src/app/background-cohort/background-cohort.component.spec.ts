import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundCohortComponent } from './background-cohort.component';

describe('BackgroundCohortComponent', () => {
  let component: BackgroundCohortComponent;
  let fixture: ComponentFixture<BackgroundCohortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundCohortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundCohortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
