import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlaceorderDailogComponent } from './customer-placeorder-dailog.component';

describe('CustomerPlaceorderDailogComponent', () => {
  let component: CustomerPlaceorderDailogComponent;
  let fixture: ComponentFixture<CustomerPlaceorderDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPlaceorderDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlaceorderDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
