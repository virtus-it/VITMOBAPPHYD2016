import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalestrackingComponent } from './salestracking.component';

describe('SalestrackingComponent', () => {
  let component: SalestrackingComponent;
  let fixture: ComponentFixture<SalestrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalestrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalestrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
