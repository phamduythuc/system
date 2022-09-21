import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'thrift-access-rule',
        loadChildren: () => import('app/modules/admin/datalake-management/thrift-manager/thrift-access-rule/thrift-access-rule.module').then(m => m.ThriftAccessRuleModule),
        data: {breadcrumb: {label: 'Thrift Access Rule', url: 'thrift-manager/thrift-access-rule'}}
    },
    {
        path: 'thrift-rule',
        loadChildren: () => import('app/modules/admin/datalake-management/thrift-manager/thrift-rule/thrift-rule.module').then(m => m.ThriftRuleModule),
        data: {breadcrumb: {label: 'Thrift Rule', url: 'thrift-manager/thrift-rule'}}

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThriftManagerRoutingModule { }
