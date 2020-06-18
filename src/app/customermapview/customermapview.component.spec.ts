import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomermapviewComponent } from './customermapview.component';

describe('CustomermapviewComponent', () => {
  let component: CustomermapviewComponent;
  let fixture: ComponentFixture<CustomermapviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomermapviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomermapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
