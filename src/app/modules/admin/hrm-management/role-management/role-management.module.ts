import { RoleManagementRoutingModule } from './role-management-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandlerAddRoleComponent } from './handler-add-role/handler-add-role.component';
import { HandlerEditRoleComponent } from './handler-edit-role/handler-edit-role.component';
import { HandlerDeleteRoleComponent } from './handler-delete-role/handler-delete-role.component';
import { HandlerViewRoleComponent } from './handler-view-role/handler-view-role.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [

  
    HandlerAddRoleComponent,
        HandlerEditRoleComponent,
        HandlerDeleteRoleComponent,
        HandlerViewRoleComponent
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class RoleManagementModule { }
