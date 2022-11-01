import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectManagementRoutingModule} from './project-management-routing.module';
import { AddOrEditProjectComponent } from './component/add-or-edit-project/add-or-edit-project.component';
import { DetailProjectComponent } from './component/detail-project/detail-project.component';
import {SharedModule} from '@shared/shared.module';
import { ProjectEffortComponent } from './component/project-effort/project-effort.component';
import {DataTableModule} from '@layout/common/data-table/data-table.module';



@NgModule({
  declarations: [
    AddOrEditProjectComponent,
    DetailProjectComponent,
    ProjectEffortComponent
  ],
    imports: [
        CommonModule,
        ProjectManagementRoutingModule,
        SharedModule,
        DataTableModule,
    ]
})
export class ProjectManagementModule { }
