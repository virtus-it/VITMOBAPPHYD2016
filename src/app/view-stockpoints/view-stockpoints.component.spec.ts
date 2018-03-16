import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockpointsComponent } from './view-stockpoints.component';

describe('ViewStockpointsComponent', () => {
  let component: ViewStockpointsComponent;
  let fixture: ComponentFixture<ViewStockpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStockpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStockpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
