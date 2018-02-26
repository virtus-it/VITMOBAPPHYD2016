import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductconfirmComponent } from './addproductconfirm.component';

describe('AddproductconfirmComponent', () => {
  let component: AddproductconfirmComponent;
  let fixture: ComponentFixture<AddproductconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
