import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trip-panel-days-badges',
  standalone: true,
  imports: [],
  templateUrl: './trip-panel-days-badges.component.html',
  styleUrl: './trip-panel-days-badges.component.css',
})
export class TripPanelDaysBadgesComponent {
  @Input() day: string | null = null;
  @Output() dayClick = new EventEmitter<string | null>();
}
