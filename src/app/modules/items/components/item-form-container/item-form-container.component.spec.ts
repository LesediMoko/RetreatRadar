import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormContainerComponent } from './item-form-container.component';

describe('ItemFormContainerComponent', () => {
  let component: ItemFormContainerComponent;
  let fixture: ComponentFixture<ItemFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFormContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
