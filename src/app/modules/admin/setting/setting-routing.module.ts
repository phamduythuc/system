import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'authorization',
    loadChildren: () => import('app/modules/admin/setting/authorization/authorization.module').then(m => m.AuthorizationModule),
    data: {breadcrumb: {label: 'Authorization', url: 'setting/authorization'}}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}
