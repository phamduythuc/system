import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PartnerService} from "../../partner.service";

@Component({
  selector: 'app-details-partner',
  templateUrl: './details-partner.component.html',
  styleUrls: ['./details-partner.component.scss']
})
export class DetailsPartnerComponent extends BaseComponent implements OnInit {

  private readonly dialogId: any;

  constructor(injector: Injector,
              public dialogRef: MatDialogRef<DetailsPartnerComponent>,
              private partnerService: PartnerService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super(injector, partnerService, dialogRef);
    this.dialogId = dialogData?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId,this.handleCoverTimeToString)
    }
  }
  ngOnInit(): void {
  }

}
