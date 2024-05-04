import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { defaultTags } from '../../../common/defaults/defaultTags';

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.css',
})
export class HomeContainerComponent {
  allTags = defaultTags;
}
