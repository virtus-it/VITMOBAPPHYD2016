import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSettingDailogComponent } from './customer-setting-dailog.component';

describe('CustomerSettingDailogComponent', () => {
  let component: CustomerSettingDailogComponent;
  let fixture: ComponentFixture<CustomerSettingDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSettingDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSettingDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
