import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'monitor',
        loadChildren: () => import('app/modules/admin/utility/ingestion-and-provisioning/monitor/monitor.module').then(m => m.MonitorModule),
        data: {breadcrumb: {label: 'Monitor', url: 'ingestion-and-provisioning/monitor'}}

    },
    {
        path: 'flow-manager',
        loadChildren: () => import('app/modules/admin/utility/ingestion-and-provisioning/flow-manager/flow-manager.module').then(m => m.FlowManagerModule),
        data: {breadcrumb: {label: 'Flow Manager', url: 'ingestion-and-provisioning/flow-manager'}}

    },
    {
        path: 'flow-customized',
        loadChildren: () => import('app/modules/admin/utility/ingestion-and-provisioning/flow-customized/flow-customized.module').then(m => m.FlowCustomizedModule),
        data: {breadcrumb: {label: 'Flow Customized', url: 'ingestion-and-provisioning/flow-customized'}}

    },
    {
        path: 'connection-manager',
        loadChildren: () => import('app/modules/admin/utility/ingestion-and-provisioning/connection-manager/connection-manager.module').then(m => m.ConnectionManagerModule),
        data: {breadcrumb: {label: 'Connection Manager', url: 'ingestion-and-provisioning/connection-manager'}}
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IngestionAndProvisioningRoutingModule {
}
