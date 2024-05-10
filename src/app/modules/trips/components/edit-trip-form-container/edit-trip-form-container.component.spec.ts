import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTripFormContainerComponent } from './edit-trip-form-container.component';

describe('EditTripFormContainerComponent', () => {
  let component: EditTripFormContainerComponent;
  let fixture: ComponentFixture<EditTripFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTripFormContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTripFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
