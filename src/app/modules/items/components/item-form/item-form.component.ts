import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Timestamp, increment } from '@angular/fire/firestore';
import {
  CheckboxControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAddItemForm } from '../../../common/types/app-types';
import { NgIf } from '@angular/common';
import { defaultTags } from '../../../common/defaults/defaultTags';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent {
  itemNameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  startTimeFormControl = new FormControl();
  endTimeFormControl = new FormControl();
  costFormControl = new FormControl(0, [Validators.required]);
  currencyFormControl = new FormControl({ value: 'ZAR', disabled: true });
  tagsFormControl = new FormControl([], Validators.minLength(1));
  addItemForm: FormGroup;

  @Output() addItem = new EventEmitter<IAddItemForm>();
  @Input() selectedTripId: string | null = null;
  tags: string[] = defaultTags;
  tagCount: number = 0;
  tagCountLimit: number = 3;
  selectedTags: string[] = [];
  tagCheckboxes: HTMLInputElement[] = [];

  constructor(private formB: FormBuilder) {
    this.addItemForm = this.formB.group({
      tripTitle: this.itemNameFormControl,
      startDate: this.startTimeFormControl,
      endDate: this.endTimeFormControl,
      cost: this.costFormControl,
      currency: this.currencyFormControl,
    });
  }

  onSaveClick(): void {
    this.addItem.emit({
      name: this.itemNameFormControl.value ?? '',
      startTime: Timestamp.fromDate(new Date(this.startTimeFormControl.value)),
      endTime: Timestamp.fromDate(new Date(this.endTimeFormControl.value)),
      tripId: this.selectedTripId ?? '',
      cost: this.costFormControl.value ?? 0,
      currency: this.currencyFormControl.value ?? '',
      tags: this.selectedTags,
    });
    this.tagCount = 0;
    this.selectedTags = [];
    this.addItemForm.reset();
    this.tagCheckboxes.forEach(tag => (tag.checked = false));
  }

  ValidateTags($event: MouseEvent): void {
    const targetCheckBox = $event.target as HTMLInputElement;
    if (targetCheckBox.checked) {
      if (this.tagCount < this.tagCountLimit) {
        this.tagCount++;
        this.tagCheckboxes.push(targetCheckBox);
        this.selectedTags.push(targetCheckBox.id);
      } else {
        targetCheckBox.checked = false;
      }
    } else {
      this.tagCount--;
      this.tagCheckboxes = this.tagCheckboxes.filter(tag => tag !== targetCheckBox);
      this.selectedTags = this.selectedTags.filter(tag => tag !== targetCheckBox.id);
    }
  }
}
