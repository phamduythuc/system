import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThriftRuleRoutingModule } from './thrift-rule-routing.module';
import { ThriftRuleComponent } from './thrift-rule.component';


@NgModule({
  declarations: [
    ThriftRuleComponent
  ],
  imports: [
    CommonModule,
    ThriftRuleRoutingModule
  ]
})
export class ThriftRuleModule { }
