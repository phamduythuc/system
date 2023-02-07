import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {DataTableModule} from '@layout/common/data-table/data-table.module';
import {ProjectStaffEffortComponent} from '@shared/components/project-staff-effort/project-staff-effort.component';

@NgModule({
  declarations: [ProjectStaffEffortComponent],
  exports: [
    ProjectStaffEffortComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTableModule,
  ]
})
export class ProjectStaffEffortModule { }
