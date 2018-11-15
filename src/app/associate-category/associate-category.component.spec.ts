import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateCategoryComponent } from './associate-category.component';

describe('AssociateCategoryComponent', () => {
  let component: AssociateCategoryComponent;
  let fixture: ComponentFixture<AssociateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
