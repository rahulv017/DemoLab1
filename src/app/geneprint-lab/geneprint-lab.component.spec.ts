import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneprintLabComponent } from './geneprint-lab.component';

describe('GeneprintLabComponent', () => {
  let component: GeneprintLabComponent;
  let fixture: ComponentFixture<GeneprintLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneprintLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneprintLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
