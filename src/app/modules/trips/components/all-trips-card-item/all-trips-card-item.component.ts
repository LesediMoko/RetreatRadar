import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ionCalendarSharp,
  ionCashOutline,
  ionLocationSharp,
  ionTimeOutline,
  ionTrashOutline,
} from '@ng-icons/ionicons';
import { IItem } from '../../../common/types/app-types';
import { FSTimestampPipe } from '../../../common/pipes/fs-timestamp.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ItineraryItemsState } from '../../../../store/Types/states';
import { deleteItem, setSelectedItem } from '../../../../store/Actions/items.actions';

@Component({
  selector: 'app-all-trips-card-item',
  standalone: true,
  templateUrl: './all-trips-card-item.component.html',
  styleUrl: './all-trips-card-item.component.css',
  viewProviders: [
    provideIcons({ ionCalendarSharp, ionTimeOutline, ionLocationSharp, ionCashOutline, ionTrashOutline }),
  ],
  imports: [NgIconComponent, FSTimestampPipe, DatePipe, CurrencyPipe],
})
export class AllTripsCardItemComponent {
  @Input() tripItem: IItem | null = null;
  @Input() selectedCurrency: string = 'ZAR';

  constructor(private itemStore: Store<ItineraryItemsState>) {}

  deleteItem() {
    if (this.tripItem) {
      this.itemStore.dispatch(setSelectedItem({ item: this.tripItem }));
      console.log(this.tripItem);
      this.itemStore.dispatch(deleteItem({ id: this.tripItem.id }));
    }
  }
}
