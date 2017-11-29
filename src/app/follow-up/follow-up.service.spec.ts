import { TestBed, inject } from '@angular/core/testing';

import { FollowUpService } from './follow-up.service';

describe('FollowUpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FollowUpService]
    });
  });

  it('should be created', inject([FollowUpService], (service: FollowUpService) => {
    expect(service).toBeTruthy();
  }));
});
