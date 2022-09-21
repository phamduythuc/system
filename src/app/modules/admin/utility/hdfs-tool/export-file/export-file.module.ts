import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportFileRoutingModule } from './export-file-routing.module';
import { ExportFileComponent } from './export-file.component';


@NgModule({
  declarations: [
    ExportFileComponent
  ],
  imports: [
    CommonModule,
    ExportFileRoutingModule
  ]
})
export class ExportFileModule { }
