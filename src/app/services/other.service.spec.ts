import { TestBed } from '@angular/core/testing';

import { OtherService } from './other.service';

describe('OtherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherService = TestBed.get(OtherService);
    expect(service).toBeTruthy();
  });
});
