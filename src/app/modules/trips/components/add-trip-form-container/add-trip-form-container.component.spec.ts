import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripFormContainerComponent } from './add-trip-form-container.component';

describe('AddTripFormContainerComponent', () => {
  let component: AddTripFormContainerComponent;
  let fixture: ComponentFixture<AddTripFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTripFormContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTripFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
