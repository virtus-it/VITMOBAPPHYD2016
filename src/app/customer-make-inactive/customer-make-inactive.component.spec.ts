import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMakeInactiveComponent } from './customer-make-inactive.component';

describe('CustomerMakeInactiveComponent', () => {
  let component: CustomerMakeInactiveComponent;
  let fixture: ComponentFixture<CustomerMakeInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMakeInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMakeInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
