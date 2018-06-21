import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRuleComponent } from './add-edit-rule.component';

describe('AddEditRuleComponent', () => {
  let component: AddEditRuleComponent;
  let fixture: ComponentFixture<AddEditRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
