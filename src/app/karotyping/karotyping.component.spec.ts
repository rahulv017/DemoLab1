import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KarotypingComponent } from './karotyping.component';

describe('KarotypingComponent', () => {
  let component: KarotypingComponent;
  let fixture: ComponentFixture<KarotypingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KarotypingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KarotypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
