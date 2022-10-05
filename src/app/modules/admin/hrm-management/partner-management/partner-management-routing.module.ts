import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PartnerManagementComponent} from "./partner-management.component";
import {DataTableModule} from "@layout/common/data-table/data-table.module";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "@shared/shared.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {NgxTrimDirectiveModule} from "ngx-trim-directive";

const routes: Routes =[
  {
    path:'',
    component: PartnerManagementComponent
  },
]

@NgModule({
  declarations: [PartnerManagementComponent],
  imports: [RouterModule.forChild(routes), DataTableModule, MatIconModule, SharedModule, MatExpansionModule, NgxTrimDirectiveModule],
  exports: [RouterModule]
})
export class PartnerManagementRoutingModule { }
