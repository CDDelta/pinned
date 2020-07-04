import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinGridComponent } from './pin-grid.component';

describe('PinGridComponent', () => {
  let component: PinGridComponent;
  let fixture: ComponentFixture<PinGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
