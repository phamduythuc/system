import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractProfileDashboardsComponent } from './contract-profile-dashboards.component';

describe('ContractProfileDashboardsComponent', () => {
  let component: ContractProfileDashboardsComponent;
  let fixture: ComponentFixture<ContractProfileDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractProfileDashboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractProfileDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
