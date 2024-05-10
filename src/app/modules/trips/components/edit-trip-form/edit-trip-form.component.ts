import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddTripForm, ITrip } from '../../../common/types/app-types';
import { Timestamp } from '@angular/fire/firestore';
import { convertFSTimestampToJSDate } from '../../../common/helpers/conversion-helpers';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-trip-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './edit-trip-form.component.html',
  styleUrl: './edit-trip-form.component.css',
})
export class EditTripFormComponent {
  editTripForm: FormGroup;
  @Output() editTrip = new EventEmitter<ITrip>();
  @Input() userId: string | null = null;
  @Input() viewingTrip: ITrip | null = null;
  tripTitleFormControl: FormControl = new FormControl(this.viewingTrip?.title, [
    Validators.required,
    Validators.minLength(3),
  ]);
  startDateFormControl: FormControl = new FormControl(
    convertFSTimestampToJSDate(this.viewingTrip?.startDate.seconds ?? 0, this.viewingTrip?.startDate.nanoseconds ?? 0),
  );
  endDateFormControl: FormControl = new FormControl(
    convertFSTimestampToJSDate(this.viewingTrip?.endDate.seconds ?? 0, this.viewingTrip?.endDate.nanoseconds ?? 0),
  );

  constructor(private formB: FormBuilder) {
    this.editTripForm = this.formB.group({
      tripTitle: this.tripTitleFormControl,
      startDate: this.startDateFormControl,
      endDate: this.endDateFormControl,
    });
  }

  onUpdateClick(): void {
    if (!this.tripTitleFormControl.value) return;

    this.editTrip.emit({
      title: this.tripTitleFormControl.value,
      startDate: Timestamp.fromDate(new Date(this.startDateFormControl.value)),
      endDate: Timestamp.fromDate(new Date(this.endDateFormControl.value)),
      uid: this.userId ?? '',
      id: this.viewingTrip?.id ?? '',
    });
  }
}
