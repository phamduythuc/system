import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmManagementRoutingModule } from './hrm-management-routing.module';
import { DepartmentManagementComponent } from './department-management/department-management.component';
import { PositionManagementComponent } from './position-management/position-management.component';
import {TranslocoModule} from "@ngneat/transloco";
import {SharedModule} from "../../../shared/shared.module";
import {DataTableModule} from "../../../layout/common/data-table/data-table.module";


@NgModule({
  declarations: [
    DepartmentManagementComponent,
    PositionManagementComponent
  ],
    imports: [
        CommonModule,
        HrmManagementRoutingModule,
        TranslocoModule,
        SharedModule,
        DataTableModule
    ]
})
export class HrmManagementModule { }
