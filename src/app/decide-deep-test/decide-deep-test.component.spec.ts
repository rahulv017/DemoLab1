import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecideDeepTestComponent } from './decide-deep-test.component';

describe('DecideDeepTestComponent', () => {
  let component: DecideDeepTestComponent;
  let fixture: ComponentFixture<DecideDeepTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecideDeepTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecideDeepTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
