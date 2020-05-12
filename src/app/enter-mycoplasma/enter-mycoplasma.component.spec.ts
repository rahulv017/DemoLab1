import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMycoplasmaComponent } from './enter-mycoplasma.component';

describe('EnterMycoplasmaComponent', () => {
  let component: EnterMycoplasmaComponent;
  let fixture: ComponentFixture<EnterMycoplasmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterMycoplasmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterMycoplasmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
