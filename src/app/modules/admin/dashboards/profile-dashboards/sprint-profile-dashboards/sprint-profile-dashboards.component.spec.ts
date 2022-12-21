import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintProfileDashboardsComponent } from './sprint-profile-dashboards.component';

describe('SprintProfileDashboardsComponent', () => {
  let component: SprintProfileDashboardsComponent;
  let fixture: ComponentFixture<SprintProfileDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintProfileDashboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintProfileDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
