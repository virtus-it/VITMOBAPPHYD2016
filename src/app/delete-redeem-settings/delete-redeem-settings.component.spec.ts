import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRedeemSettingsComponent } from './delete-redeem-settings.component';

describe('DeleteRedeemSettingsComponent', () => {
  let component: DeleteRedeemSettingsComponent;
  let fixture: ComponentFixture<DeleteRedeemSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRedeemSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRedeemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
