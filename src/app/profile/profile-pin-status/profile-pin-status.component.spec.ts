import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePinStatusComponent } from './profile-pin-status.component';

describe('ProfilePinStatusComponent', () => {
  let component: ProfilePinStatusComponent;
  let fixture: ComponentFixture<ProfilePinStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePinStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePinStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
