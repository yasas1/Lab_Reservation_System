import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResyourComponent } from './resyour.component';

describe('ResyourComponent', () => {
  let component: ResyourComponent;
  let fixture: ComponentFixture<ResyourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResyourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResyourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
