import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentManagementRoutingModule } from './document-management-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageModule } from '@shared/components/error-message/error-message.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { AddOrEditDocumentComponent } from './add-or-edit-document/add-or-edit-document.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';


@NgModule({
  declarations: [
    AddOrEditDocumentComponent,
    DetailDocumentComponent,
  ],
  imports: [
    CommonModule,
    DocumentManagementRoutingModule,
    SharedModule,
    FormsModule,
    ErrorMessageModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule
  ]
})
export class DocumentManagementModule { }
