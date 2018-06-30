import { TestBed, inject } from '@angular/core/testing';

import { DoreservationService } from './doreservation.service';

describe('DoreservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoreservationService]
    });
  });

  it('should be created', inject([DoreservationService], (service: DoreservationService) => {
    expect(service).toBeTruthy();
  }));
});
