import { TestBed } from '@angular/core/testing';

import { ApicallerService } from './apicaller.service';

describe('ApicallerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApicallerService = TestBed.get(ApicallerService);

    expect(service).toBeTruthy();
  });
});
