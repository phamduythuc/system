import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { AddOrEditProjectComponent } from './add-or-edit-project/add-or-edit-project.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import { SharedModule } from '@shared/shared.module';
import { ProjectEffortComponent } from './project-effort/project-effort.component';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { ProjectMemberComponent } from './project-member/project-member.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AddOrEditProjectComponent,
    DetailProjectComponent,
    ProjectEffortComponent,
    ProjectMemberComponent

  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    SharedModule,
    DataTableModule,
    NgxMatSelectSearchModule,
    MatExpansionModule,
    HttpClientModule,
  ]

})
export class ProjectManagementModule {}
