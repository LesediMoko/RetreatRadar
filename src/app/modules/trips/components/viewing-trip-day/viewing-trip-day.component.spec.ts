import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingTripDayComponent } from './viewing-trip-day.component';

describe('ViewingTripDayComponent', () => {
  let component: ViewingTripDayComponent;
  let fixture: ComponentFixture<ViewingTripDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewingTripDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewingTripDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
