import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBriefComponent } from './update-brief.component';

describe('UpdateBriefComponent', () => {
  let component: UpdateBriefComponent;
  let fixture: ComponentFixture<UpdateBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
