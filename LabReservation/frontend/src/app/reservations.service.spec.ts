import { TestBed, inject } from '@angular/core/testing';

import { ReservationsService } from './reservations.service';

describe('ReservationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservationsService]
    });
  });

  it('should be created', inject([ReservationsService], (service: ReservationsService) => {
    expect(service).toBeTruthy();
  }));
});
