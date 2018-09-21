import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseRequestDetailDailogComponent } from './raise-request-detail-dailog.component';

describe('RaiseRequestDetailDailogComponent', () => {
  let component: RaiseRequestDetailDailogComponent;
  let fixture: ComponentFixture<RaiseRequestDetailDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseRequestDetailDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseRequestDetailDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
