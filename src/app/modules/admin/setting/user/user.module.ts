import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {SharedModule} from "../../../../shared/shared.module";
import { GroupListComponent } from './group-list/group-list.component';
import {DataTableModule} from "../../../../layout/common/data-table/data-table.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddGroupDialogComponent } from './components/add-group-dialog/add-group-dialog.component';
import {ErrorMessageModule} from "../../../../shared/components/error-message/error-message.module";
import { AddOrEditUserComponent } from './components/add-or-edit-user/add-or-edit-user.component';
import { CreateIpDialogComponent } from './components/add-or-edit-user/create-ip-dialog/create-ip-dialog.component';


@NgModule({
    declarations: [
        UserComponent,
        GroupListComponent,
        AddGroupDialogComponent,
        AddOrEditUserComponent,
        CreateIpDialogComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        DataTableModule,
        FormsModule,
        ErrorMessageModule,
        ReactiveFormsModule
    ]
})
export class UserModule {
}
