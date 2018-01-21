import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerResendInvitationComponent } from './customer-resend-invitation.component';

describe('CustomerResendInvitationComponent', () => {
  let component: CustomerResendInvitationComponent;
  let fixture: ComponentFixture<CustomerResendInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerResendInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerResendInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
