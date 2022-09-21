import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EncryptToolComponent} from "./encrypt-tool.component";

const routes: Routes = [
    {
        path: '',
        component: EncryptToolComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncryptToolRoutingModule { }
