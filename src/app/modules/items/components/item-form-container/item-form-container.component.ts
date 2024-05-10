import { Component } from '@angular/core';
import { ItemFormComponent } from '../item-form/item-form.component';
import { ItineraryItemsState } from '../../../../store/Types/states';
import { Store } from '@ngrx/store';
import { selectSelectedTripId } from '../../../../store/Selectors/items.selector';
import { IAddItemForm } from '../../../common/types/app-types';
import { addItem } from '../../../../store/Actions/items.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-item-form-container',
  standalone: true,
  imports: [ItemFormComponent, AsyncPipe],
  templateUrl: './item-form-container.component.html',
  styleUrl: './item-form-container.component.css',
})
export class ItemFormContainerComponent {
  selectCurrentTripId$ = this.itemStore.select(selectSelectedTripId);

  constructor(private itemStore: Store<ItineraryItemsState>) {}
  addItemSubmit($event: IAddItemForm) {
    this.itemStore.dispatch(addItem({ item: $event }));
  }
}
