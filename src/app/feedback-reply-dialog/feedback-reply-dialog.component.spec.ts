import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackReplyDialogComponent } from './feedback-reply-dialog.component';

describe('FeedbackReplyDialogComponent', () => {
  let component: FeedbackReplyDialogComponent;
  let fixture: ComponentFixture<FeedbackReplyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackReplyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackReplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
