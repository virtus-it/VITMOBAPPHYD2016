import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductServiceAreaComponent } from './product-service-area.component';

describe('ProductServiceAreaComponent', () => {
  let component: ProductServiceAreaComponent;
  let fixture: ComponentFixture<ProductServiceAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductServiceAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductServiceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
