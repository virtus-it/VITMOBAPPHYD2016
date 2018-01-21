import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduledOrderComponent } from './delete-scheduled-order.component';

describe('DeleteScheduledOrderComponent', () => {
  let component: DeleteScheduledOrderComponent;
  let fixture: ComponentFixture<DeleteScheduledOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteScheduledOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScheduledOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
