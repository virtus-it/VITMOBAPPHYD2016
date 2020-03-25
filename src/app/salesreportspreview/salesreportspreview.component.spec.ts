import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreportspreviewComponent } from './salesreportspreview.component';

describe('SalesreportspreviewComponent', () => {
  let component: SalesreportspreviewComponent;
  let fixture: ComponentFixture<SalesreportspreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesreportspreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesreportspreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
