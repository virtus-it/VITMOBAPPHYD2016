import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPointsComponent } from './edit-points.component';

describe('EditPointsComponent', () => {
  let component: EditPointsComponent;
  let fixture: ComponentFixture<EditPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
