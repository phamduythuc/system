import FileSaver from 'file-saver';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';
import { HrDocumentService } from '@shared/services/hr-document.service';
import { CategoriesService } from '@core/categories.service';

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.scss']
})
export class DetailDocumentComponent extends BaseComponent implements OnInit {

  private readonly dialogId: any;

  docType: any = [];
  docStatus: any = [];
  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<DetailDocumentComponent>,
    private documentService: HrDocumentService,
    private achievementService: AchievementService,
    private categories: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any

  ) {
    super(injector,documentService, dialogRef);
    this.dialogId = dialogData?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId);
    }
   }

  ngOnInit(): void {
    if (this.dialogId) {
      this.getDetails(this.dialogId, () => {
        this.categories
      .getCategories('HR_DOCUMENT_TYPE')
      .subscribe((res) => {
        this.docType = res.data;
        this.docType.map((x: any) => {
          x.code = Number(x.code);
          if (Number(x?.code) === this.detailsData?.documentType) {
            this.detailsData.documentType = x.name;
          }
          return x;
        });
      });
      });

      this.getDetails(this.dialogId, () => {
        this.categories
      .getCategories('HR_DOCUMENT_STATUS')
      .subscribe((res) => {
        this.docStatus = res.data;
        this.docStatus.map((x: any) => {
          x.code = Number(x.code);
          if (Number(x?.code) === this.detailsData?.status) {
            this.detailsData.status = x.name;
          }
          return x;
        });
      });
      });

      // this.detailsData.effDate = CommonUtilsService.dateToString(
      //   this.detailsData.effDate,
      //   false
      // );
      console.log(this.detailsData.effDate);

      this.detailsData.expDate = CommonUtilsService.dateToString(
        this.detailsData.expDate,
        false
      );
    }
  }

  download(data: any) {
    this.achievementService
      .renderFile({
        filePath: data,
        fileType: 2,
      })
      .subscribe((res) => {
        const res1 = this.getResponseFromHeader(res.headers);
        if (this.isSuccess(res1)) {
        const fileName = this.getFileName(res.headers);
        FileSaver.saveAs(res.body, fileName);
        }
        else {
          this.showSnackBar(res1.message, 'error');
        };
      });
  }

}
