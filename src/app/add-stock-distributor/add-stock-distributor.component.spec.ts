import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockDistributorComponent } from './add-stock-distributor.component';

describe('AddStockDistributorComponent', () => {
  let component: AddStockDistributorComponent;
  let fixture: ComponentFixture<AddStockDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
