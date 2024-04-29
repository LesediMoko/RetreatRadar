import { Component } from '@angular/core';
import { RRTitleComponent } from '../../../common/components/rrtitle/rrtitle.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamGithub, jamGoogle } from '@ng-icons/jam-icons';
import { RouterLink } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, loginGit, loginGoogle } from '../../../../store/Actions/user.actions';
import { selectUserID, selectUserProfile, selectIsAuthenticated } from '../../../../store/Selectors/user.selector';
import { UserState } from '../../../../store/Types/states';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [RRTitleComponent, NgIconComponent, RouterLink, NgIf, FormsModule, ReactiveFormsModule],
  viewProviders: [provideIcons({ jamGithub, jamGoogle })],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\S)(?!.* ).{8,}$/),
  ]);
  loginForm: FormGroup;

  userID$ = this.store.select(selectUserID);
  userProfile$ = this.store.select(selectUserProfile);
  userAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private store: Store<UserState>,
    private formB: FormBuilder,
  ) {
    this.loginForm = this.formB.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  loginGoogle(): void {
    this.store.dispatch(loginGoogle());
  }

  loginGit(): void {
    this.store.dispatch(loginGit());
  }

  loginUser(): void {
    if (!this.emailFormControl.value || !this.passwordFormControl.value) return;

    this.store.dispatch(
      login({
        password: this.passwordFormControl.value,
        email: this.emailFormControl.value,
      }),
    );
  }

  ngOnInit(): void {}
}
