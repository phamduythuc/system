import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TeamManagementComponent} from "./team-management.component";

const routes: Routes = [
  {
    path:'',
    component:TeamManagementComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class TeamManagementRoutingModule { }
