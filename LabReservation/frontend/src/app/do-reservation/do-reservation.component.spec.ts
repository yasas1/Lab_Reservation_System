import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoReservationComponent } from './do-reservation.component';

describe('DoReservationComponent', () => {
  let component: DoReservationComponent;
  let fixture: ComponentFixture<DoReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
