import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPanelContainerComponent } from './trip-panel-container.component';

describe('TripPanelContainerComponent', () => {
  let component: TripPanelContainerComponent;
  let fixture: ComponentFixture<TripPanelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPanelContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
