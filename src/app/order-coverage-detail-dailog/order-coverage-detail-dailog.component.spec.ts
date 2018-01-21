import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCoverageDetailDailogComponent } from './order-coverage-detail-dailog.component';

describe('OrderCoverageDetailDailogComponent', () => {
  let component: OrderCoverageDetailDailogComponent;
  let fixture: ComponentFixture<OrderCoverageDetailDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCoverageDetailDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCoverageDetailDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
