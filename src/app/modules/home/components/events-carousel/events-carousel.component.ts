import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEventItem } from '../../../common/types/app-types';

@Component({
  selector: 'app-events-carousel',
  standalone: true,
  imports: [],
  templateUrl: './events-carousel.component.html',
  styleUrl: './events-carousel.component.css',
})
export class EventsCarouselComponent {
  @Input() events: IEventItem[] = [];
  @Output() onClick = new EventEmitter<IEventItem>();
}
