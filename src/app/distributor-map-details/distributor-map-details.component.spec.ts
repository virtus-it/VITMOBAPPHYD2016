import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorMapDetailsComponent } from './distributor-map-details.component';

describe('DistributorMapDetailsComponent', () => {
  let component: DistributorMapDetailsComponent;
  let fixture: ComponentFixture<DistributorMapDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorMapDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorMapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
