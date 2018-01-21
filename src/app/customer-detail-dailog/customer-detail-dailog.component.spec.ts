import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailDailogComponent } from './customer-detail-dailog.component';

describe('CustomerDetailDailogComponent', () => {
  let component: CustomerDetailDailogComponent;
  let fixture: ComponentFixture<CustomerDetailDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
