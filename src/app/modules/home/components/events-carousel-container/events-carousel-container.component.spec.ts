import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCarouselContainerComponent } from './events-carousel-container.component';

describe('EventsCarouselContainerComponent', () => {
  let component: EventsCarouselContainerComponent;
  let fixture: ComponentFixture<EventsCarouselContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsCarouselContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsCarouselContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
