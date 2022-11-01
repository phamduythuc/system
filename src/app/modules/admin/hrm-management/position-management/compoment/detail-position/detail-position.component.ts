import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseComponent} from "@core/base.component";
import {PositionManagementService} from "@shared/services/position-management.service";

@Component({
  selector: 'app-detail-position',
  templateUrl: './detail-position.component.html',
  styleUrls: ['./detail-position.component.scss']
})
export class DetailPositionComponent extends BaseComponent implements OnInit {
  private readonly dialogId: any;

  constructor(injector: Injector,public positionService:PositionManagementService,
     public dialogRef: MatDialogRef<DetailPositionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector,positionService,dialogRef)
    this.dialogId = data?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId);
    }
  }

  ngOnInit(): void {
  }

}
