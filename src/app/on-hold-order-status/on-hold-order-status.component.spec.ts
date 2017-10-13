import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHoldOrderStatusComponent } from './on-hold-order-status.component';

describe('OnHoldOrderStatusComponent', () => {
  let component: OnHoldOrderStatusComponent;
  let fixture: ComponentFixture<OnHoldOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnHoldOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnHoldOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
