import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPreviewComponent } from './reports-preview.component';

describe('ReportsPreviewComponent', () => {
  let component: ReportsPreviewComponent;
  let fixture: ComponentFixture<ReportsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
