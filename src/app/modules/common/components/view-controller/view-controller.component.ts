import { Component } from '@angular/core';
import { UserState } from '../../../../store/Types/states';
import { Store } from '@ngrx/store';
import { selectUserID, selectUserProfile } from '../../../../store/Selectors/user.selector';
import { ViewComponent } from '../view/view.component';
import { AsyncPipe } from '@angular/common';
import { fetchProfile } from '../../../../store/Actions/user.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-view-controller',
  standalone: true,
  imports: [ViewComponent, AsyncPipe],
  templateUrl: './view-controller.component.html',
  styleUrl: './view-controller.component.css',
})
export class ViewControllerComponent {
  userProfileInfo$ = this.store.select(selectUserProfile);
  constructor(private store: Store<UserState>) {
    this.userProfileInfo$ = this.store.select(selectUserProfile);
  }
}
