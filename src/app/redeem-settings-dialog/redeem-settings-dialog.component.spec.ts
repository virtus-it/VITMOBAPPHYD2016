import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemSettingsDialogComponent } from './redeem-settings-dialog.component';

describe('RedeemSettingsDialogComponent', () => {
  let component: RedeemSettingsDialogComponent;
  let fixture: ComponentFixture<RedeemSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
