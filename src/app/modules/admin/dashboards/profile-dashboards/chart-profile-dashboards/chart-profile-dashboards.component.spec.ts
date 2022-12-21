import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartProfileDashboardsComponent } from './chart-profile-dashboards.component';

describe('ChartProfileDashboardsComponent', () => {
  let component: ChartProfileDashboardsComponent;
  let fixture: ComponentFixture<ChartProfileDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartProfileDashboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartProfileDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
