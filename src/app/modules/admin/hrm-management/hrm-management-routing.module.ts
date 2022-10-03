import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: 'department-management',
        loadChildren: () => import('app/modules/admin/hrm-management/department-management/department-management.module').then(m => m.DepartmentManagementModule),
        data: {breadcrumb: {label: 'hrm-management.department.title', url: 'hrm-management/department-management'}}
    },
    {
        path: 'position-management',
        loadChildren: () => import('app/modules/admin/hrm-management/position-management/position-management.module').then(m => m.PositionManagementModule),
        data: {breadcrumb: {label: 'Position Management', url: 'hrm-management/position-management'}}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmManagementRoutingModule { }
