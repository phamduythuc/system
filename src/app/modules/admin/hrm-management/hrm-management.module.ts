import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmManagementRoutingModule } from './hrm-management-routing.module';
import { DepartmentManagementComponent } from './department-management/department-management.component';
import { PositionManagementComponent } from './position-management/position-management.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '@shared/shared.module';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { StaffLevelManagementComponent } from './staff-level-management/staff-level-management.component';
import { ErrorMessageModule } from '@shared/components/error-message/error-message.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserModule } from '../setting/user/user.module';
import { TeamManagementModule } from './team-management/team-management.module';
import { FuseDrawerModule } from '../../../../@fuse/components/drawer';
import { StaffManagementModule } from './staff-management/staff-management.module';
import { RoleManagementModule } from './role-management/role-management.module';
import { RoleManagementComponent } from './role-management/role-management.component';


@NgModule({
  declarations: [
    DepartmentManagementComponent,
    PositionManagementComponent,
    StaffLevelManagementComponent,
    ProjectManagementComponent,
    StaffManagementComponent,
    TeamManagementComponent,
    RoleManagementComponent,

  ],
  imports: [
    CommonModule,
    HrmManagementRoutingModule,
    TranslocoModule,
    SharedModule,
    DataTableModule,
    MatExpansionModule,
    ErrorMessageModule,
    NgxTrimDirectiveModule,
    MatSidenavModule,
    UserModule,
    TeamManagementModule,
    FuseDrawerModule,
    StaffManagementModule,
    RoleManagementModule,
    

  ],
})
export class HrmManagementModule {}
