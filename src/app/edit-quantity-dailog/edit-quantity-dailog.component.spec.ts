import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuantityDailogComponent } from './edit-quantity-dailog.component';

describe('EditQuantityDailogComponent', () => {
  let component: EditQuantityDailogComponent;
  let fixture: ComponentFixture<EditQuantityDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuantityDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuantityDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
