import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePinComponent } from './profile-pin.component';

describe('ProfilePinComponent', () => {
  let component: ProfilePinComponent;
  let fixture: ComponentFixture<ProfilePinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
