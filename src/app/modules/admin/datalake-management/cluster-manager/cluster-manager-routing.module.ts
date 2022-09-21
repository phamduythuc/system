import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'server-ip-table-manager',
        loadChildren: () => import('app/modules/admin/datalake-management/cluster-manager/server-ip-table-manager/server-ip-table-manager.module').then(m => m.ServerIpTableManagerModule),
        data: {breadcrumb: {label: 'Server Ip Table Manager', url: 'cluster-manager/server-ip-table-manager'}}
    },
    {
        path: 'ip-table-rule',
        loadChildren: () => import('app/modules/admin/datalake-management/cluster-manager/ip-table-rule/ip-table-rule.module').then(m => m.IpTableRuleModule),
        data: {breadcrumb: {label: 'Ip Table Rule', url: 'cluster-manager/ip-table-rule'}}
    },
    {
        path: 'du-file-hdfs-rule',
        loadChildren: () => import('app/modules/admin/datalake-management/cluster-manager/du-file-hdfs-rule/du-file-hdfs-rule.module').then(m => m.DuFileHdfsRuleModule),
        data: {breadcrumb: {label: 'Du File HDFS Rule', url: 'cluster-manager/du-file-hdfs-rule'}}
    },
    {
        path: 'du-file-server-rule',
        loadChildren: () => import('app/modules/admin/datalake-management/cluster-manager/du-file-server-rule/du-file-server-rule.module').then(m => m.DuFileServerRuleModule),
        data: {breadcrumb: {label: 'Du File Server Rule', url: 'cluster-manager/du-file-server-rule'}}
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClusterManagerRoutingModule { }
