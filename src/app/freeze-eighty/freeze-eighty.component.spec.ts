import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeEightyComponent } from './freeze-eighty.component';

describe('FreezeEightyComponent', () => {
  let component: FreezeEightyComponent;
  let fixture: ComponentFixture<FreezeEightyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezeEightyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeEightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
