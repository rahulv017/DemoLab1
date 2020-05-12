import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DNALABComponent } from './dnalab.component';

describe('DNALABComponent', () => {
  let component: DNALABComponent;
  let fixture: ComponentFixture<DNALABComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DNALABComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DNALABComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
