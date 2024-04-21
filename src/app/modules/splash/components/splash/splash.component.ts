import { Component } from '@angular/core';
import { RRTitleComponent } from '../../../common/components/rrtitle/rrtitle.component';
import { RRSloganComponent } from '../../../common/components/rrslogan/rrslogan.component';
import { AuthOptionsComponent } from '../auth-options/auth-options.component';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [RRTitleComponent, RRSloganComponent, AuthOptionsComponent],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css',
})
export class SplashComponent {}
