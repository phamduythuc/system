import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PartnerManagementRoutingModule} from "./partner-management-routing.module";
import { AddOrEditPartnerComponent } from './component/add-or-edit-partner/add-or-edit-partner.component';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessageModule} from "@shared/components/error-message/error-message.module";
import {NgxTrimDirectiveModule} from "ngx-trim-directive";



@NgModule({
  declarations: [
    AddOrEditPartnerComponent
  ],
  imports: [
    CommonModule,
    PartnerManagementRoutingModule,
    SharedModule,
    FormsModule,
    ErrorMessageModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule
  ]
})
export class PartnerManagementModule { }
