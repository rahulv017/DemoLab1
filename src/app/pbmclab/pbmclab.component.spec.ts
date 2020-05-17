import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PBMCLABComponent } from './pbmclab.component';

describe('PBMCLABComponent', () => {
  let component: PBMCLABComponent;
  let fixture: ComponentFixture<PBMCLABComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PBMCLABComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PBMCLABComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
