import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PartnerService} from "@shared/services/partner.service";
import {BaseComponent} from "@core/base.component";
import {StaffLevelService} from "@shared/services/staff-level.service";

@Component({
  selector: 'app-details-staff-level',
  templateUrl: './details-staff-level.component.html',
  styleUrls: ['./details-staff-level.component.scss']
})
export class DetailsStaffLevelComponent extends BaseComponent implements OnInit {

  private readonly dialogId: any;

  constructor(injector: Injector,
              public dialogRef: MatDialogRef<DetailsStaffLevelComponent>,
              private staffLevelService: StaffLevelService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super(injector, staffLevelService, dialogRef);
    this.dialogId = dialogData?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId,this.handleCoverTimeToString)
    }
  }

  ngOnInit(): void {
  }

}
