import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncryptToolRoutingModule } from './encrypt-tool-routing.module';
import { EncryptToolComponent } from './encrypt-tool.component';


@NgModule({
  declarations: [
    EncryptToolComponent
  ],
  imports: [
    CommonModule,
    EncryptToolRoutingModule
  ]
})
export class EncryptToolModule { }
