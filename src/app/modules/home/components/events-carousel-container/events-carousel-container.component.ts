import { Component } from '@angular/core';
import { EventsCarouselComponent } from '../events-carousel/events-carousel.component';
import { EventsState } from '../../../../store/Types/states';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { loadEvents } from '../../../../store/Actions/events.actions';
import { selectEvents } from '../../../../store/Selectors/events.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-events-carousel-container',
  standalone: true,
  imports: [EventsCarouselComponent, AsyncPipe],
  templateUrl: './events-carousel-container.component.html',
  styleUrl: './events-carousel-container.component.css',
})
export class EventsCarouselContainerComponent {
  eventsInfoList$ = this.store.select(selectEvents);
  constructor(private store: Store<EventsState>) {
    this.store.dispatch(loadEvents());
  }
}
