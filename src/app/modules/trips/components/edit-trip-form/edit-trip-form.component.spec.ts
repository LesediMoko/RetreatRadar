import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTripFormComponent } from './edit-trip-form.component';

describe('EditTripFormComponent', () => {
  let component: EditTripFormComponent;
  let fixture: ComponentFixture<EditTripFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTripFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
