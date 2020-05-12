import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackInformationComponent } from './rack-information.component';

describe('RackInformationComponent', () => {
  let component: RackInformationComponent;
  let fixture: ComponentFixture<RackInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
