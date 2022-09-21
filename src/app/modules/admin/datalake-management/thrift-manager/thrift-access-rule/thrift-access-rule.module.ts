import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThriftAccessRuleRoutingModule } from './thrift-access-rule-routing.module';
import { ThriftAccessRuleComponent } from './thrift-access-rule.component';


@NgModule({
  declarations: [
    ThriftAccessRuleComponent
  ],
  imports: [
    CommonModule,
    ThriftAccessRuleRoutingModule
  ]
})
export class ThriftAccessRuleModule { }
