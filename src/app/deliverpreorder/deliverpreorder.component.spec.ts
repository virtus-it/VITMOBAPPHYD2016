import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverpreorderComponent } from './deliverpreorder.component';

describe('DeliverpreorderComponent', () => {
  let component: DeliverpreorderComponent;
  let fixture: ComponentFixture<DeliverpreorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverpreorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverpreorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
