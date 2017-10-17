import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHistoryDailogComponent } from './product-history-dailog.component';

describe('ProductHistoryDailogComponent', () => {
  let component: ProductHistoryDailogComponent;
  let fixture: ComponentFixture<ProductHistoryDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHistoryDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHistoryDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
