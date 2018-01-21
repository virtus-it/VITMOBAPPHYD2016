import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSetPaymentCycleComponent } from './customer-set-payment-cycle.component';

describe('CustomerSetPaymentCycleComponent', () => {
  let component: CustomerSetPaymentCycleComponent;
  let fixture: ComponentFixture<CustomerSetPaymentCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSetPaymentCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSetPaymentCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
