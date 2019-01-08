import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExcelUploadComponent } from './customer-excel-upload.component';

describe('CustomerExcelUploadComponent', () => {
  let component: CustomerExcelUploadComponent;
  let fixture: ComponentFixture<CustomerExcelUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerExcelUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerExcelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
