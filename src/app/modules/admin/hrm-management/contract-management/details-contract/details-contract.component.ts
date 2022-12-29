import { messages } from './../../../../../mock-api/common/messages/data';
import FileSaver from 'file-saver';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';
import { ContractService } from '@shared/services/contract.service';
import { StaffService } from '@shared/services/staff.service';

@Component({
  selector: 'app-details-contract',
  templateUrl: './details-contract.component.html',
  styleUrls: ['./details-contract.component.scss'],
})
export class DetailsContractComponent extends BaseComponent implements OnInit {
  private readonly dialogId: any;
  listUser: any = [];
  listCaregories: any = [];

  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<DetailsContractComponent>,
    private achievementService: AchievementService,
    private ContractService: ContractService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super(injector, ContractService, dialogRef);
    this.dialogId = dialogData?.id;
    this.listUser = dialogData.listUser;
    this.listCaregories = dialogData.listCaregories;
  }

  ngOnInit(): void {
    if (this.dialogId) {
      this.getDetails(this.dialogId, () => {
        this.listCaregories.CONTACT_TYPE.map((x) => {
          if (x.code == this.detailsData.type) {
            this.detailsData.type = x.name;
            this.detailsData.effDate = CommonUtilsService.dateToString(
              this.detailsData.effDate,
              false
            );
            this.detailsData.expDate = CommonUtilsService.dateToString(
              this.detailsData.expDate,
              false
            );
            this.detailsData.signDate = CommonUtilsService.dateToString(
              this.detailsData.signDate,
              false
            );
            this.detailsData.createdDate = CommonUtilsService.dateToString(
              this.detailsData.createdDate,
              false
            );
            this.detailsData.modifiedDate = CommonUtilsService.dateToString(
              this.detailsData.modifiedDate,
              false
            );
            this.detailsData.salary =
              Number(this.detailsData.salary).toLocaleString() + ' đ';
            this.detailsData.insurance =
              this.detailsData.insurance.toLocaleString() + ' đ';
          }
        });

        this.listCaregories.CONTRACT_STATUS.map((x) => {
          if (x.code == this.detailsData.status) {
            this.detailsData.status = x.name;
          }
        });

        this.listUser.map((z) => {
          if (z.id == this.detailsData.staffId) {
            this.detailsData.staffName = z.fullName;
          }
        });
      });
    }
  }

  download(data: any) {
    this.achievementService
      .renderFile({
        filePath: data,
        fileType: 2,
      })
      .subscribe((res1) => {
        const fileName = this.getFileName(res1.headers);
        FileSaver.saveAs(res1.body, fileName);
      });
  }
}
