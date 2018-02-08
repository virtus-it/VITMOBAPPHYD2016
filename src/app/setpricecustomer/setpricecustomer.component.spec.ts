import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpricecustomerComponent } from './setpricecustomer.component';

describe('SetpricecustomerComponent', () => {
  let component: SetpricecustomerComponent;
  let fixture: ComponentFixture<SetpricecustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpricecustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpricecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
