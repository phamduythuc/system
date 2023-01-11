import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTimeKeepingComponent } from './calendar-time-keeping.component';

describe('CalendarTimeKeepingComponent', () => {
  let component: CalendarTimeKeepingComponent;
  let fixture: ComponentFixture<CalendarTimeKeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTimeKeepingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTimeKeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
