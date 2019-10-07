import { TestBed } from '@angular/core/testing';

import { NonempGuardService } from './nonemp-guard.service';

describe('NonempGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonempGuardService = TestBed.get(NonempGuardService);
    expect(service).toBeTruthy();
  });
});
