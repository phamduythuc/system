import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExportFileComponent} from "./export-file.component";

const routes: Routes = [
    {
        path: '',
        component: ExportFileComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportFileRoutingModule { }
