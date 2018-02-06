import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordupdateComponent } from './passwordupdate.component';

describe('PasswordupdateComponent', () => {
  let component: PasswordupdateComponent;
  let fixture: ComponentFixture<PasswordupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
