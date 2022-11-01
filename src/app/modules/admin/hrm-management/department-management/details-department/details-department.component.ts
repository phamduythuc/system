import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentManagementService} from "@shared/services/department-management.service";
import {BaseComponent} from "@core/base.component";

@Component({
  selector: 'app-details-department',
  templateUrl: './details-department.component.html',
  styleUrls: ['./details-department.component.scss']
})
export class DetailsDepartmentComponent extends BaseComponent implements OnInit {
  private readonly dialogId: any;

  constructor(injector: Injector,
              public dialogRef: MatDialogRef<DetailsDepartmentComponent>,
              private departmentService: DepartmentManagementService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super(injector, departmentService, dialogRef);
    this.dialogId = dialogData?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId, this.handleCoverTimeToString)
    }
  }
  ngOnInit(): void {
  }

}
