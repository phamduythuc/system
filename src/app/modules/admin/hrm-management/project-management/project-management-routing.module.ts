import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectManagementComponent} from './project-management.component';

const routes: Routes = [
  {
    path:'',
    component:ProjectManagementComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ProjectManagementRoutingModule { }
