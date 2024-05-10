import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingTripItemCardComponent } from './viewing-trip-item-card.component';

describe('ViewingTripItemCardComponent', () => {
  let component: ViewingTripItemCardComponent;
  let fixture: ComponentFixture<ViewingTripItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewingTripItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewingTripItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
