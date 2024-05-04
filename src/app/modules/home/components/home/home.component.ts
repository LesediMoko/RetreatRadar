import { Component, Input } from '@angular/core';
import { EventsCarouselContainerComponent } from '../events-carousel-container/events-carousel-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventsCarouselContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Input() allTags: string[] = [];
}
