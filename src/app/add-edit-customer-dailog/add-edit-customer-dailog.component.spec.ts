import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerDailogComponent } from './add-edit-customer-dailog.component';

describe('AddEditCustomerDailogComponent', () => {
  let component: AddEditCustomerDailogComponent;
  let fixture: ComponentFixture<AddEditCustomerDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCustomerDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCustomerDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
