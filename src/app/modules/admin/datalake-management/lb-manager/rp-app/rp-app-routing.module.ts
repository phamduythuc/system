import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RpAppComponent} from "./rp-app.component";

const routes: Routes = [
    {
        path: '',
        component: RpAppComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpAppRoutingModule { }
