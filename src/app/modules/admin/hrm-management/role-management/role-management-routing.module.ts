import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RoleManagementComponent } from './role-management.component';


const routes: Routes = [
  {
    path:'',
    component:RoleManagementComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class RoleManagementRoutingModule{

 }
