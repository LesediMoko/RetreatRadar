import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem, ITrip } from '../../../common/types/app-types';
import { AllTripsCardItemComponent } from '../all-trips-card-item/all-trips-card-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-trips-card',
  standalone: true,
  imports: [AllTripsCardItemComponent, RouterLink],
  templateUrl: './all-trips-card.component.html',
  styleUrl: './all-trips-card.component.css',
})
export class AllTripsCardComponent {
  @Input() trip: ITrip | null = null;
  @Input() tripItems: IItem[] = [];
  @Input() selectedTrip: ITrip | null = null;
  @Input() selectedCurrencyCard: string = 'ZAR';
  @Output() onTripClick = new EventEmitter<ITrip | null>();
  @Output() onTripViewClick = new EventEmitter<ITrip | null>();
  @Output() onTripDeleteClick = new EventEmitter<[ITrip | null, IItem[] | []] | null>();
}
