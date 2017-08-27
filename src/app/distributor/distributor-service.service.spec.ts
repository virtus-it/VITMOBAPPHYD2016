import { TestBed, inject } from '@angular/core/testing';

import { DistributorServiceService } from './distributor-service.service';

describe('DistributorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributorServiceService]
    });
  });

  it('should be created', inject([DistributorServiceService], (service: DistributorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
