import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromocodeDialogComponent } from './add-promocode-dialog.component';

describe('AddPromocodeDialogComponent', () => {
  let component: AddPromocodeDialogComponent;
  let fixture: ComponentFixture<AddPromocodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromocodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromocodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
