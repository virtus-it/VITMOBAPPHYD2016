import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTemplateComponent } from './create-update-template.component';

describe('CreateUpdateTemplateComponent', () => {
  let component: CreateUpdateTemplateComponent;
  let fixture: ComponentFixture<CreateUpdateTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
