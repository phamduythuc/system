import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectManagementRoutingModule} from "./project-management-routing.module";
import { AddOrEditProjectComponent } from './component/add-or-edit-project/add-or-edit-project.component';
import { DetailProjectComponent } from './component/detail-project/detail-project.component';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxTrimDirectiveModule} from "ngx-trim-directive";
import {ErrorMessageModule} from "@shared/components/error-message/error-message.module";



@NgModule({
  declarations: [
    AddOrEditProjectComponent,
    DetailProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    SharedModule,
    FormsModule,ReactiveFormsModule,
    NgxTrimDirectiveModule,
    ErrorMessageModule
  ]
})
export class ProjectManagementModule { }
