import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterLabDataComponent } from './enter-lab-data.component';

describe('EnterLabDataComponent', () => {
  let component: EnterLabDataComponent;
  let fixture: ComponentFixture<EnterLabDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterLabDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterLabDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
