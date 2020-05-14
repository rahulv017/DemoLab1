import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterGeneprintComponent } from './enter-geneprint.component';

describe('EnterGeneprintComponent', () => {
  let component: EnterGeneprintComponent;
  let fixture: ComponentFixture<EnterGeneprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterGeneprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterGeneprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
