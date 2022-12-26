import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractManagementComponent } from './contract-management.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DataTableModule } from '@layout/common/data-table/data-table.module';
import { DetailsContractComponent } from './details-contract/details-contract.component';
import { AddOrEditContractComponent } from './add-or-edit-contract/add-or-edit-contract.component';

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
