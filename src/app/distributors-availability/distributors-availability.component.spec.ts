import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsAvailabilityComponent } from './distributors-availability.component';

describe('DistributorsAvailabilityComponent', () => {
  let component: DistributorsAvailabilityComponent;
  let fixture: ComponentFixture<DistributorsAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorsAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
