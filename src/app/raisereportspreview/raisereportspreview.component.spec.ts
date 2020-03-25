import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisereportspreviewComponent } from './raisereportspreview.component';

describe('RaisereportspreviewComponent', () => {
  let component: RaisereportspreviewComponent;
  let fixture: ComponentFixture<RaisereportspreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisereportspreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisereportspreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
