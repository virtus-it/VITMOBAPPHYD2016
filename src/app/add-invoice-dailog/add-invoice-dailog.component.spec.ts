import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoiceDailogComponent } from './add-invoice-dailog.component';

describe('AddInvoiceDailogComponent', () => {
  let component: AddInvoiceDailogComponent;
  let fixture: ComponentFixture<AddInvoiceDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvoiceDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvoiceDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
