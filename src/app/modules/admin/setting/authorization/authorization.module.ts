import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthorizationRoutingModule} from './authorization-routing.module';
import {AuthorizationComponent} from './authorization.component';
import {SharedModule} from "../../../../shared/shared.module";
import {AddOrEditAuthComponent} from './add-or-edit-auth/add-or-edit-auth.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MenuTreeComponent } from './menu-tree/menu-tree.component';
import {TreeviewModule} from "ngx-treeview";


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
        MatSidenavModule,
        MatCheckboxModule,
        TreeviewModule.forRoot()
    ]
})
export class AuthorizationModule {

}
