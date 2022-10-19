import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthorizationRoutingModule} from './authorization-routing.module';
import {AuthorizationComponent} from './authorization.component';
import {SharedModule} from "../../../../shared/shared.module";
import {MatTreeModule} from "@angular/material/tree";
import {AddOrEditAuthComponent} from './add-or-edit-auth/add-or-edit-auth.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MenuTreeComponent } from './menu-tree/menu-tree.component';


@NgModule({
  declarations: [
    AuthorizationComponent,
    AddOrEditAuthComponent,
    MenuTreeComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule,
    MatTreeModule,
    MatSidenavModule,
    MatCheckboxModule
  ]
})
export class AuthorizationModule {

}
