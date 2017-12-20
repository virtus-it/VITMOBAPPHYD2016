import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductsForassingComponent } from './select-products-forassing.component';

describe('SelectProductsForassingComponent', () => {
  let component: SelectProductsForassingComponent;
  let fixture: ComponentFixture<SelectProductsForassingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductsForassingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductsForassingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
