import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockHistoryComponent } from './add-stock-history.component';

describe('AddStockHistoryComponent', () => {
  let component: AddStockHistoryComponent;
  let fixture: ComponentFixture<AddStockHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
