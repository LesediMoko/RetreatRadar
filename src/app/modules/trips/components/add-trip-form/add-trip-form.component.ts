import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddTripForm } from '../../../common/types/app-types';
import { NgIf } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-trip-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-trip-form.component.html',
  styleUrl: './add-trip-form.component.css',
})
export class AddTripFormComponent {
  tripTitleFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();
  addTripForm: FormGroup;
  @Output() addTrip = new EventEmitter<IAddTripForm>();
  @Input() userId: string | null = null;

  constructor(private formB: FormBuilder) {
    this.addTripForm = this.formB.group({
      tripTitle: this.tripTitleFormControl,
      startDate: this.startDateFormControl,
      endDate: this.endDateFormControl,
    });
  }

  onSaveClick(): void {
    if (!this.tripTitleFormControl.value) return;

    this.addTrip.emit({
      title: this.tripTitleFormControl.value,
      startDate: Timestamp.fromDate(new Date(this.startDateFormControl.value)),
      endDate: Timestamp.fromDate(new Date(this.endDateFormControl.value)),
      uid: this.userId ?? '',
    });
  }
}
