import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';
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
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super(injector, achievementService, dialogRef);
    this.dialogId = dialogData?.id;
    this.listUser = dialogData.listUser;
    this.listCaregories = dialogData.listCaregories;
  }

  ngOnInit(): void {
    if (this.dialogId) {
      this.getDetails(this.dialogId, () => {});
    }
    this.detailsData = {
      id: 5,
      staffId: 355,
      code: 'CT5',
      type: 1,
      status: 1,
      effDate: '2022-01-01T00:00:00Z',
      expDate: '2023-01-01T00:00:00Z',
      signDate: '2022-01-01T00:00:00Z',
      salary: 100000000,
      insurance: 500000.0,
      termPeriod: 2,
      contractFilePath: 'contract/0e391dea-a695-40bc-bc52-d619ea580882.docx',
      createdDate: '2022-12-22T02:33:43Z',
      modifiedDate: '2022-12-22T02:33:43Z',
      createdBy: 'admin',
      modifiedBy: 'admin phụ',
    };

    this.listCaregories.CONTACT_TYPE.map((x) => {
      if (x.code == this.detailsData.type) {
        this.detailsData.type = x.name;
        this.detailsData.effDate = CommonUtilsService.dateToString(
          this.detailsData.effDate,
          false
        );
        this.detailsData.expDate = CommonUtilsService.dateToString(
          this.detailsData.effDate,
          false
        );
        this.detailsData.signDate = CommonUtilsService.dateToString(
          this.detailsData.effDate,
          false
        );
        this.detailsData.createdDate = CommonUtilsService.dateToString(
          this.detailsData.effDate,
          false
        );
        this.detailsData.modifiedDate = CommonUtilsService.dateToString(
          this.detailsData.effDate,
          false
        );
        this.detailsData.salary =
          this.detailsData.salary.toLocaleString() + ' đ';
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
        this.detailsData.staffId = z.fullName;
      }
    });
  }

  download(data: any) {
    this.achievementService
      .renderFile({
        filePath: data,
        fileType: '1',
      })
      .subscribe((res1) => {});
  }
}
