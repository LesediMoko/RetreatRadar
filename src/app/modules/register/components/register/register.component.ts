import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  AsyncValidatorFn,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserState } from '../../../../store/Types/states';
import { register, registerGit, registerGoogle } from '../../../../store/Actions/user.actions';
import { RRTitleComponent } from '../../../common/components/rrtitle/rrtitle.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamGithub, jamGoogle } from '@ng-icons/jam-icons';
import { RouterLink } from '@angular/router';
import { selectIsAuthenticated, selectUserID, selectUserProfile } from '../../../../store/Selectors/user.selector';
import { IUser } from '../../../common/types/app-types';
import { DbService } from '../../../../services/db.service';
import { Observable, catchError, debounce, debounceTime, first, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    AsyncPipe,
    RRTitleComponent,
    NgIconComponent,
    RouterLink,
    NgIf,
  ],
  viewProviders: [provideIcons({ jamGithub, jamGoogle })],
})
export class RegisterComponent {
  passwordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent || !control.parent.get('password')) return null;

      const targetControl = control.parent.get('password')!;

      const result = targetControl.value === control.value ? null : { passwordMatch: true };
      return result;
    };
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(300),
        switchMap(value => this.dbService.findProfileByUsername(value)),
        map(user => (user ? { usernameTaken: true } : null)),
        first(),
      );
    };
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  surnameFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\S)(?!.* ).{8,}$/),
  ]);
  passwordConfirmFormControl = new FormControl('', [Validators.required, this.passwordMatch()]);
  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)], [this.usernameValidator()]);
  registerForm: FormGroup;

  userID$ = this.store.select(selectUserID);
  userProfile$ = this.store.select(selectUserProfile);
  userAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private store: Store<UserState>,
    private formB: FormBuilder,
    private dbService: DbService,
  ) {
    this.registerForm = this.formB.group({
      email: this.emailFormControl,
      name: this.nameFormControl,
      surname: this.surnameFormControl,
      password: this.passwordFormControl,
      passwordConfirm: this.passwordConfirmFormControl,
      username: this.usernameFormControl,
    });
  }

  signUpGoogle(): void {
    this.store.dispatch(registerGoogle());
  }

  signUpGit(): void {
    this.store.dispatch(registerGit());
  }

  signUpUser(): void {
    if (
      !this.emailFormControl.value ||
      !this.passwordFormControl.value ||
      !this.nameFormControl.value ||
      !this.surnameFormControl.value ||
      !this.usernameFormControl.value
    )
      return;
    const userProfileInfo: IUser = {
      username: this.usernameFormControl.value,
      name: this.nameFormControl.value,
      surname: this.surnameFormControl.value,
    };
    this.store.dispatch(
      register({
        userProfile: userProfileInfo,
        password: this.passwordFormControl.value,
        email: this.emailFormControl.value,
      }),
    );
  }
}
