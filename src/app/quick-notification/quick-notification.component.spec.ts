import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNotificationComponent } from './quick-notification.component';

describe('QuickNotificationComponent', () => {
  let component: QuickNotificationComponent;
  let fixture: ComponentFixture<QuickNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
