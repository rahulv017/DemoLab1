import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycoplasmaLabComponent } from './mycoplasma-lab.component';

describe('MycoplasmaLabComponent', () => {
  let component: MycoplasmaLabComponent;
  let fixture: ComponentFixture<MycoplasmaLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycoplasmaLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycoplasmaLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
