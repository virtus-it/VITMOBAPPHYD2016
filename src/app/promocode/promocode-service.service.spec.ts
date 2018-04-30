import { TestBed, inject } from '@angular/core/testing';

import { PromocodeServiceService } from './promocode-service.service';

describe('PromocodeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromocodeServiceService]
    });
  });

  it('should be created', inject([PromocodeServiceService], (service: PromocodeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
