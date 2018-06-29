import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSupplierComponent } from './track-supplier.component';

describe('TrackSupplierComponent', () => {
  let component: TrackSupplierComponent;
  let fixture: ComponentFixture<TrackSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
