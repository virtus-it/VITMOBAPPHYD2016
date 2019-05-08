import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownOrdersComponent } from './unknown-orders.component';

describe('UnknownOrdersComponent', () => {
  let component: UnknownOrdersComponent;
  let fixture: ComponentFixture<UnknownOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
