import { TestBed } from '@angular/core/testing';

import { RackServiceService } from './rack-service.service';

describe('RackServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RackServiceService = TestBed.get(RackServiceService);
    expect(service).toBeTruthy();
  });
});
