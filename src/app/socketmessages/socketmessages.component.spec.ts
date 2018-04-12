import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketmessagesComponent } from './socketmessages.component';

describe('SocketmessagesComponent', () => {
  let component: SocketmessagesComponent;
  let fixture: ComponentFixture<SocketmessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketmessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
