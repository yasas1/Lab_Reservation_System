import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarydateComponent } from './summarydate.component';

describe('SummarydateComponent', () => {
  let component: SummarydateComponent;
  let fixture: ComponentFixture<SummarydateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarydateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
