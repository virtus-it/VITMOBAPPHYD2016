import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCanDailogComponent } from './empty-can-dailog.component';

describe('EmptyCanDailogComponent', () => {
  let component: EmptyCanDailogComponent;
  let fixture: ComponentFixture<EmptyCanDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyCanDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCanDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
