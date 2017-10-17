import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductDailogComponent } from './add-edit-product-dailog.component';

describe('AddEditProductDailogComponent', () => {
  let component: AddEditProductDailogComponent;
  let fixture: ComponentFixture<AddEditProductDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditProductDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
