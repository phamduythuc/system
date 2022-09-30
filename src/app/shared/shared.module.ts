import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HasAnyAuthorityDirective} from "./directives/has-any-authority.directive";
import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";
import {BreadcrumbComponent} from "../layout/common/breadcrumb/breadcrumb.component";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {TranslocoModule} from "@ngneat/transloco";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
export const MatModules = [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        ...MatModules
    ],
    declarations: [
        HasAnyAuthorityDirective,
        BreadcrumbComponent,
        ConfirmDialogComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HasAnyAuthorityDirective,
        BreadcrumbComponent,
        ...MatModules
    ]
})
export class SharedModule {
}
