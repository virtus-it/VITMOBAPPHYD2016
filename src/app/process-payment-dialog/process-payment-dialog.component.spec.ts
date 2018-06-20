import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPaymentDialogComponent } from './process-payment-dialog.component';

describe('ProcessPaymentDialogComponent', () => {
  let component: ProcessPaymentDialogComponent;
  let fixture: ComponentFixture<ProcessPaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessPaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
