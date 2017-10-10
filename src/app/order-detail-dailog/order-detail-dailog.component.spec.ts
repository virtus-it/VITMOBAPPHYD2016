import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailDailogComponent } from './order-detail-dailog.component';

describe('OrderDetailDailogComponent', () => {
  let component: OrderDetailDailogComponent;
  let fixture: ComponentFixture<OrderDetailDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
