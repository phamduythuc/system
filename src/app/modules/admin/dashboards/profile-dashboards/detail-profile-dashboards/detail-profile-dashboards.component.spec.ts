import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProfileDashboardsComponent } from './detail-profile-dashboards.component';

describe('DetailProfileDashboardsComponent', () => {
  let component: DetailProfileDashboardsComponent;
  let fixture: ComponentFixture<DetailProfileDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProfileDashboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProfileDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
