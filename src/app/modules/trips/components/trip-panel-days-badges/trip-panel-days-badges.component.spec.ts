import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPanelDaysBadgesComponent } from './trip-panel-days-badges.component';

describe('TripPanelDaysBadgesComponent', () => {
  let component: TripPanelDaysBadgesComponent;
  let fixture: ComponentFixture<TripPanelDaysBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPanelDaysBadgesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripPanelDaysBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
