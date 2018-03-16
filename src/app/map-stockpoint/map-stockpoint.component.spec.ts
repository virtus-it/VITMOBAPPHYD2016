import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStockpointComponent } from './map-stockpoint.component';

describe('MapStockpointComponent', () => {
  let component: MapStockpointComponent;
  let fixture: ComponentFixture<MapStockpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapStockpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapStockpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
