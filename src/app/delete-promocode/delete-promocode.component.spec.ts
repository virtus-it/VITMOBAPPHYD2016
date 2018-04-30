import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePromocodeComponent } from './delete-promocode.component';

describe('DeletePromocodeComponent', () => {
  let component: DeletePromocodeComponent;
  let fixture: ComponentFixture<DeletePromocodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePromocodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
