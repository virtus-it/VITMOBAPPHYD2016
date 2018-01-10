import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerScheduleEditDailogComponent } from './customer-schedule-edit-dailog.component';

describe('CustomerScheduleEditDailogComponent', () => {
  let component: CustomerScheduleEditDailogComponent;
  let fixture: ComponentFixture<CustomerScheduleEditDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerScheduleEditDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerScheduleEditDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
