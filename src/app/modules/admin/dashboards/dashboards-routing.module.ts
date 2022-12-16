import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
  },
  {
    path: 'profile-dashboards',
    loadChildren: () =>
      import(
        'app/modules/admin/dashboards/profile-dashboards/profile-dashboards.module'
      ).then((m) => m.ProfileDashboardsModule),
    data: {
      breadcrumb: {
        label: 'dashboard.profile.breadcrumb',
        url: 'dashboards/profile-dashboards',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
