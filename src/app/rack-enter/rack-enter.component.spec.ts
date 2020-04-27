import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackEnterComponent } from './rack-enter.component';

describe('RackEnterComponent', () => {
  let component: RackEnterComponent;
  let fixture: ComponentFixture<RackEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
