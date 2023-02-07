import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProfileDashboardsComponent } from './profile-dashboards.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileDashboardsComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDashboardsRoutingModule {
}
