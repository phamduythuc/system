import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StaffLevelManagementComponent} from "./staff-level-management.component";

const routes : Routes = [
  {
    path:'',
    component:StaffLevelManagementComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StaffLevelManagementRoutingModule { }
