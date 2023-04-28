import { TestBed } from '@angular/core/testing';

import { GlobalAccountService } from './account.service';

describe('GlobalAccountService', () => {
  let service: GlobalAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
