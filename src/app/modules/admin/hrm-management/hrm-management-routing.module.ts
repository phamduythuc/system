import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'department-management',
    loadChildren: () => import('app/modules/admin/hrm-management/department-management/department-management.module').then(m => m.DepartmentManagementModule),
    data: {breadcrumb: {label: 'hrm-management.department.title', url: 'hrm-management/department-management'}}
  },
  {
    path: 'staff-level-management',
    loadChildren: () => import('app/modules/admin/hrm-management/staff-level-management/staff-level-management.module').then(m => m.StaffLevelManagementModule),
    data: {breadcrumb: {label: 'hrm-management.specialize.title', url: 'hrm-management/staff-level-management'}}
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
  {
    path: 'project-management',
    loadChildren: () => import('app/modules/admin/hrm-management/project-management/project-management.module').then(m => m.ProjectManagementModule),
    data: {breadcrumb: {label: 'hrm-management.project.title', url: 'hrm-management/project-management'}}
  },
  {
    path: 'staff-management',
    loadChildren: () => import('./staff-management/staff-management.module').then(m => m.StaffManagementModule),
    data: {breadcrumb: {label: 'hrm-management.staff.title', url: 'hrm-management/staff-management'}}
  },
  {
    path: 'team-management',
    loadChildren: () => import('app/modules/admin/hrm-management/team-management/team-management.module').then(m => m.TeamManagementModule),
    data: {breadcrumb: {label: 'hrm-management.team.title', url: 'hrm-management/team-management'}}
  },
  {
    path: 'role-management',
    loadChildren: () => import('app/modules/admin/hrm-management/role-management/role-management.module').then(m => m.RoleManagementModule),
    data: {breadcrumb: {label: 'hrm-management.role.title', url: 'hrm-management/role-management'}}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmManagementRoutingModule {
}
