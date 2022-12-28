import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractManagementComponent } from './contract-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { DetailsContractComponent } from './details-contract/details-contract.component';
import { AddOrEditContractComponent } from './add-or-edit-contract/add-or-edit-contract.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    ContractManagementComponent,
    DetailsContractComponent,
    AddOrEditContractComponent,
  ],
  imports: [
    CommonModule,
    DataTableModule,
    TranslocoModule,
    SharedModule,
    NgxMatSelectSearchModule,
    MatStepperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContractManagementComponent,
      },
    ]),
  ],
  exports: [ContractManagementComponent],
})
export class ContractManagementModule {}
