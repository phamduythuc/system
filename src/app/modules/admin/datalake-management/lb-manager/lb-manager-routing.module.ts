import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'lb-connection',
        loadChildren: () => import('app/modules/admin/datalake-management/lb-manager/lb-connection/lb-connection.module').then(m => m.LbConnectionModule),
        data: {breadcrumb: {label: 'LB Connection', url: 'lb-manager/lb-connection'}}
    },
    {
        path: 'rp-app',
        loadChildren: () => import('app/modules/admin/datalake-management/lb-manager/rp-app/rp-app.module').then(m => m.RpAppModule),
        data: {breadcrumb: {label: 'RP App', url: 'lb-manager/rp-app'}}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LbManagerRoutingModule { }
