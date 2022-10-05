import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: 'department-management',
        loadChildren: () => import('app/modules/admin/hrm-management/department-management/department-management.module').then(m => m.DepartmentManagementModule),
        data: {breadcrumb: {label: 'hrm-management.department.title', url: 'hrm-management/department-management'}}
    },
    {
        path: 'staff-level-management',
      loadChildren: () => import('app/modules/admin/hrm-management/staff-level-management/staff-level-management.module').then(m => m.StaffLevelManagementModule),
      data: {breadcrumb: {label: 'hrm-management.staffLevel.title', url: 'hrm-management/staff-level-management'}}
    },
    {
        path: 'position-management',
        loadChildren: () => import('app/modules/admin/hrm-management/position-management/position-management.module').then(m => m.PositionManagementModule),
        data: {breadcrumb: {label: 'hrm-management.position.title', url: 'hrm-management/position-management'}}
    },
  {
        path: 'partner-management',
        loadChildren: () => import('app/modules/admin/hrm-management/partner-management/partner-management.module').then(m => m.PartnerManagementModule),
        data: {breadcrumb: {label: 'hrm-management.partner.title', url: 'hrm-management/partner-management'}}
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmManagementRoutingModule { }
