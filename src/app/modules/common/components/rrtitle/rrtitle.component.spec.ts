import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RRTitleComponent } from './rrtitle.component';

describe('RRTitleComponent', () => {
  let component: RRTitleComponent;
  let fixture: ComponentFixture<RRTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RRTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RRTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
