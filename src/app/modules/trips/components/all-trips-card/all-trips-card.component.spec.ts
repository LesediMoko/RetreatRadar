import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTripsCardComponent } from './all-trips-card.component';

describe('AllTripsCardComponent', () => {
  let component: AllTripsCardComponent;
  let fixture: ComponentFixture<AllTripsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTripsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTripsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
