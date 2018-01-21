import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderListComponent } from './supplier-order-list.component';

describe('SupplierOrderListComponent', () => {
  let component: SupplierOrderListComponent;
  let fixture: ComponentFixture<SupplierOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
