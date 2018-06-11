import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPointsComponent } from './add-edit-points.component';

describe('AddEditPointsComponent', () => {
  let component: AddEditPointsComponent;
  let fixture: ComponentFixture<AddEditPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
