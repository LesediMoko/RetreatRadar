import { Component } from '@angular/core';
import { EventsCarouselComponent } from '../events-carousel/events-carousel.component';
import { EventsState } from '../../../../store/Types/states';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { loadEvents, setSelectedEvent } from '../../../../store/Actions/events.actions';
import { selectEvents } from '../../../../store/Selectors/events.selector';
import { AsyncPipe } from '@angular/common';
import { IEventItem } from '../../../common/types/app-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-carousel-container',
  standalone: true,
  imports: [EventsCarouselComponent, AsyncPipe],
  templateUrl: './events-carousel-container.component.html',
  styleUrl: './events-carousel-container.component.css',
})
export class EventsCarouselContainerComponent {
  eventsInfoList$ = this.store.select(selectEvents);
  constructor(
    private store: Store<EventsState>,
    private router: Router,
  ) {
    this.store.dispatch(loadEvents());
  }

  onClickEventItem(event: IEventItem) {
    console.log('event', event);
    this.store.dispatch(setSelectedEvent({ event }));
    this.router.navigate([`/app/event-details/${event.id}`]);
  }
}
