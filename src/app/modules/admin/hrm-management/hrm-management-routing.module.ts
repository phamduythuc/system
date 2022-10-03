import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaffLevelManagementComponent} from "./staff-level-management/staff-level-management.component";


const routes: Routes = [
    {
        path: 'department-management',
        loadChildren: () => import('app/modules/admin/hrm-management/department-management/department-management.module').then(m => m.DepartmentManagementModule),
        data: {breadcrumb: {label: 'Department Management', url: 'hrm-management/department-management'}}
    },
    {
        path: 'staff-level-management',
        component: StaffLevelManagementComponent,
        data: {breadcrumb: {label: 'Staff level Management', url: 'hrm-management/department-management'}}
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
