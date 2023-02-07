import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDashboardsComponent } from './profile-dashboards.component';

describe('ProfileDashboardsComponent', () => {
  let component: ProfileDashboardsComponent;
  let fixture: ComponentFixture<ProfileDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDashboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
