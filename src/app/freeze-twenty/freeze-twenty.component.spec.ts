import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeTwentyComponent } from './freeze-twenty.component';

describe('FreezeTwentyComponent', () => {
  let component: FreezeTwentyComponent;
  let fixture: ComponentFixture<FreezeTwentyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezeTwentyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
