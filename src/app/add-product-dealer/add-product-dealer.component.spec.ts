import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDealerComponent } from './add-product-dealer.component';

describe('AddProductDealerComponent', () => {
  let component: AddProductDealerComponent;
  let fixture: ComponentFixture<AddProductDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
