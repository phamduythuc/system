import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmManagementRoutingModule } from './hrm-management-routing.module';
import { DepartmentManagementComponent } from './department-management/department-management.component';
import { PositionManagementComponent } from './position-management/position-management.component';
import {TranslocoModule} from '@ngneat/transloco';
import {SharedModule} from '@shared/shared.module';
import {DataTableModule} from '@layout/common/data-table/data-table.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { StaffLevelManagementComponent } from './staff-level-management/staff-level-management.component';
import { AddOrEditStaffLevelComponent } from './staff-level-management/compoment/add-or-edit-staff-level/add-or-edit-staff-level.component';
import {ErrorMessageModule} from '@shared/components/error-message/error-message.module';


@NgModule({
  declarations: [
    DepartmentManagementComponent,
    PositionManagementComponent,
    StaffLevelManagementComponent,
    AddOrEditStaffLevelComponent
  ],
    imports: [
        CommonModule,
        HrmManagementRoutingModule,
        TranslocoModule,
        SharedModule,
        DataTableModule,
        MatExpansionModule,
        ErrorMessageModule
    ]
})
export class HrmManagementModule { }
