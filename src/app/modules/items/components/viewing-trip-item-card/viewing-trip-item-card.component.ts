import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCalendarSharp, ionCashOutline, ionLocationSharp, ionTimeOutline } from '@ng-icons/ionicons';
import { IItem } from '../../../common/types/app-types';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FSTimestampPipe } from '../../../common/pipes/fs-timestamp.pipe';
@Component({
  selector: 'app-viewing-trip-item-card',
  standalone: true,
  imports: [NgIconComponent, DatePipe, FSTimestampPipe, CurrencyPipe],
  templateUrl: './viewing-trip-item-card.component.html',
  styleUrl: './viewing-trip-item-card.component.css',
  viewProviders: [provideIcons({ ionCalendarSharp, ionTimeOutline, ionLocationSharp, ionCashOutline })],
})
export class ViewingTripItemCardComponent {
  @Input() item: IItem | null = null;
  @Input() selectedCurrency: string | null = null;
}
