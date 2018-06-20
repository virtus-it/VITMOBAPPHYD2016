import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedPaymentsDetailsComponent } from './processed-payments-details.component';

describe('ProcessedPaymentsDetailsComponent', () => {
  let component: ProcessedPaymentsDetailsComponent;
  let fixture: ComponentFixture<ProcessedPaymentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedPaymentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedPaymentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
