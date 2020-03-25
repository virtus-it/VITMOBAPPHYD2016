import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreportpreviewComponent } from './paymentreportpreview.component';

describe('PaymentreportpreviewComponent', () => {
  let component: PaymentreportpreviewComponent;
  let fixture: ComponentFixture<PaymentreportpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentreportpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreportpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
