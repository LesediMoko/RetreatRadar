import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAddItemForm, IEventItem, IItem } from '../../../common/types/app-types';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCalendarSharp, ionCashOutline, ionLocationSharp, ionTimeOutline } from '@ng-icons/ionicons';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FSTimestampPipe } from '../../../common/pipes/fs-timestamp.pipe';
import { Timestamp } from '@angular/fire/firestore';
import { tablerCalendarMinus, tablerCalendarPlus } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [NgIconComponent, DatePipe, FSTimestampPipe, CurrencyPipe],
  viewProviders: [
    provideIcons({
      ionCalendarSharp,
      ionTimeOutline,
      ionLocationSharp,
      ionCashOutline,
      tablerCalendarPlus,
      tablerCalendarMinus,
    }),
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent {
  @Input() selectedEvent: IEventItem | null = null;
  @Input() selectedCurrency = 'ZAR';
  @Input() selectedTripId: string | null = null;
  @Input() selselectedTripItemsIds: string[] | null = null;
  @Output() addEvent = new EventEmitter<IItem>();
  @Output() removeEvent = new EventEmitter<string>();
  onSaveClick(): void {
    if (!this.selectedEvent || this.selectedEvent.endTime || this.selectedEvent.startTime) return;
    this.addEvent.emit({
      id: this.selectedEvent?.id ?? '',
      name: this.selectedEvent?.name ?? '',
      startTime: this.selectedEvent?.startTime,
      endTime: this.selectedEvent?.endTime,
      tripId: this.selectedTripId ?? '',
      cost: this.selectedEvent?.cost ?? 0,
      currency: this.selectedEvent?.currency ?? '',
      tags: this.selectedEvent?.tags ?? [],
    });
  }

  onRemoveClick(): void {
    this.removeEvent.emit(this.selectedEvent?.id ?? '');
  }
}
