import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTripsCardItemComponent } from './all-trips-card-item.component';

describe('AllTripsCardItemComponent', () => {
  let component: AllTripsCardItemComponent;
  let fixture: ComponentFixture<AllTripsCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTripsCardItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTripsCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
