import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateDistributorComponent } from './associate-distributor.component';

describe('AssociateDistributorComponent', () => {
  let component: AssociateDistributorComponent;
  let fixture: ComponentFixture<AssociateDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
