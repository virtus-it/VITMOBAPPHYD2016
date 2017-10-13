import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderStatusComponent } from './edit-order-status.component';

describe('EditOrderStatusComponent', () => {
  let component: EditOrderStatusComponent;
  let fixture: ComponentFixture<EditOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
