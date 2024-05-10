import { Component, Input } from '@angular/core';
import { IEventItem } from '../../../common/types/app-types';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCalendarSharp, ionCashOutline, ionLocationSharp, ionTimeOutline } from '@ng-icons/ionicons';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FSTimestampPipe } from '../../../common/pipes/fs-timestamp.pipe';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [NgIconComponent, DatePipe, FSTimestampPipe, CurrencyPipe],
  viewProviders: [provideIcons({ ionCalendarSharp, ionTimeOutline, ionLocationSharp, ionCashOutline })],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent {
  @Input() selectedEvent: IEventItem | null = null;
  @Input() selectedCurrency = 'ZAR';
}
