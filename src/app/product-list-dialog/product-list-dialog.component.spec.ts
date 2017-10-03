import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListDialogComponent } from './product-list-dialog.component';

describe('ProductListDialogComponent', () => {
  let component: ProductListDialogComponent;
  let fixture: ComponentFixture<ProductListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
