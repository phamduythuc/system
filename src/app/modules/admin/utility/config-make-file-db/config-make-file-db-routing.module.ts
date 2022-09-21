import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigMakeFileDbComponent} from "./config-make-file-db.component";

const routes: Routes = [
    {
        path: '',
        component: ConfigMakeFileDbComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigMakeFileDbRoutingModule { }
