import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderCartDailogComponent } from './pre-order-cart-dailog.component';

describe('PreOrderCartDailogComponent', () => {
  let component: PreOrderCartDailogComponent;
  let fixture: ComponentFixture<PreOrderCartDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreOrderCartDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreOrderCartDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
