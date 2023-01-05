import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'profile-management',
    loadChildren: () =>
      import(
        'app/modules/admin/dashboards/profile-dashboards/profile-dashboards.module'
      ).then((m) => m.ProfileDashboardsModule),
    data: {
      breadcrumb: {
        label: 'profile.title',
        url: 'hrm-management/profile-management',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
