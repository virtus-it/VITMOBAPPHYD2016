import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdatecategoryComponent } from './createupdatecategory.component';

describe('CreateupdatecategoryComponent', () => {
  let component: CreateupdatecategoryComponent;
  let fixture: ComponentFixture<CreateupdatecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateupdatecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateupdatecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
