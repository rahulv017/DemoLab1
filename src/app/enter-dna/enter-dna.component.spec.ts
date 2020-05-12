import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterDNAComponent } from './enter-dna.component';

describe('EnterDNAComponent', () => {
  let component: EnterDNAComponent;
  let fixture: ComponentFixture<EnterDNAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterDNAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterDNAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
