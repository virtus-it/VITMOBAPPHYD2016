import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstockProductComponent } from './addstock-product.component';

describe('AddstockProductComponent', () => {
  let component: AddstockProductComponent;
  let fixture: ComponentFixture<AddstockProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstockProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstockProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
