import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorListDialogComponent } from './distributor-list-dialog.component';

describe('DistributorListDialogComponent', () => {
  let component: DistributorListDialogComponent;
  let fixture: ComponentFixture<DistributorListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
