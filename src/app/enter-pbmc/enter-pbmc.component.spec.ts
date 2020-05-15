import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPBMCComponent } from './enter-pbmc.component';

describe('EnterPBMCComponent', () => {
  let component: EnterPBMCComponent;
  let fixture: ComponentFixture<EnterPBMCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPBMCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPBMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
