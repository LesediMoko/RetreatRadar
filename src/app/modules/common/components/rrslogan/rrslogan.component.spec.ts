import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RRSloganComponent } from './rrslogan.component';

describe('RRSloganComponent', () => {
  let component: RRSloganComponent;
  let fixture: ComponentFixture<RRSloganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RRSloganComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RRSloganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
