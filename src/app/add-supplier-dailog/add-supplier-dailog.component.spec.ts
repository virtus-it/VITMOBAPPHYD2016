import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierDailogComponent } from './add-supplier-dailog.component';

describe('AddSupplierDailogComponent', () => {
  let component: AddSupplierDailogComponent;
  let fixture: ComponentFixture<AddSupplierDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
