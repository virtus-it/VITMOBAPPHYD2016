import { TestBed, inject } from '@angular/core/testing';

import { OrderLandingService } from './order-landing.service';

describe('OrderLandingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderLandingService]
    });
  });

  it('should be created', inject([OrderLandingService], (service: OrderLandingService) => {
    expect(service).toBeTruthy();
  }));
});
