import { Component, Input } from '@angular/core';
import { GroupedItem } from '../../../common/types/app-types';
import { ViewingTripItemCardComponent } from '../../../items/components/viewing-trip-item-card/viewing-trip-item-card.component';

@Component({
  selector: 'app-viewing-trip-day',
  standalone: true,
  imports: [ViewingTripItemCardComponent],
  templateUrl: './viewing-trip-day.component.html',
  styleUrl: './viewing-trip-day.component.css',
})
export class ViewingTripDayComponent {
  @Input() groupedItem: GroupedItem | null = null;
}
