import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'hdfs-browser',
        loadChildren: () => import('app/modules/admin/utility/hdfs-tool/hdfs-browser/hdfs-browser.module').then(m => m.HdfsBrowserModule),
        data: {breadcrumb: {label: 'HDFS Browser', url: 'hdfs-tool/hdfs-browser'}}
    },
    {
        path: 'export-file',
        loadChildren: () => import('app/modules/admin/utility/hdfs-tool/export-file/export-file.module').then(m => m.ExportFileModule),
        data: {breadcrumb: {label: 'Export File', url: 'hdfs-tool/export-file'}}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HdfsToolRoutingModule {
}
