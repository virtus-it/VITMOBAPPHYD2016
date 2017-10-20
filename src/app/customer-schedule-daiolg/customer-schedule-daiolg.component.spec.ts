import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerScheduleDaiolgComponent } from './customer-schedule-daiolg.component';

describe('CustomerScheduleDaiolgComponent', () => {
  let component: CustomerScheduleDaiolgComponent;
  let fixture: ComponentFixture<CustomerScheduleDaiolgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerScheduleDaiolgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerScheduleDaiolgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
