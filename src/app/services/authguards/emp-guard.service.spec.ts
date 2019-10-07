import { TestBed } from '@angular/core/testing';

import { EmpGuardService } from './emp-guard.service';

describe('EmpGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpGuardService = TestBed.get(EmpGuardService);
    expect(service).toBeTruthy();
  });
});
