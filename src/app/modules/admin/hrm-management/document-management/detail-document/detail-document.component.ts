import FileSaver from 'file-saver';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.scss']
})
export class DetailDocumentComponent extends BaseComponent implements OnInit {

  private readonly dialogId: any;
  listUser: any = [];
  listCaregories: any = [];
  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<DetailDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any

  ) {
    super(injector);
    // this.dialogId = dialogData?.id;
    // this.listUser = dialogData.listUser;
    // this.listCaregories = dialogData.listCaregories;
   }

  ngOnInit(): void {
  }

}
