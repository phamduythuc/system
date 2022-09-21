import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'job-management',
        loadChildren: () => import('app/modules/admin/utility/etl-tool/job-management/job-management.module').then(m => m.JobManagementModule),
        data: {breadcrumb: {label: 'Job Management', url: 'etl-tool/job-management'}}
    },
    {
        path: 'lookup-table',
        loadChildren: () => import('app/modules/admin/utility/etl-tool/lookup-table/lookup-table.module').then(m => m.LookupTableModule),
        data: {breadcrumb: {label: 'Lookup Table', url: 'etl-tool/lookup-table'}}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EtlToolRoutingModule {
}
