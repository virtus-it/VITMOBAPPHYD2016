import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorOrderListComponent } from './distributor-order-list.component';

describe('DistributorOrderListComponent', () => {
  let component: DistributorOrderListComponent;
  let fixture: ComponentFixture<DistributorOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
