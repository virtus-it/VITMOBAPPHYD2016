import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTeamAssignComponent } from './sales-team-assign.component';

describe('SalesTeamAssignComponent', () => {
  let component: SalesTeamAssignComponent;
  let fixture: ComponentFixture<SalesTeamAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTeamAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTeamAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
