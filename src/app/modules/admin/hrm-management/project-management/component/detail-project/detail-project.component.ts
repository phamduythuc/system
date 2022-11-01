import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DepartmentManagementService} from '@shared/services/department-management.service';
import {ProjectManagementService} from '@shared/services/project-management.service';
import {BaseComponent} from '@core/base.component';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent extends BaseComponent implements OnInit {
  private readonly dialogId: any;

  constructor(injector: Injector,
              public dialogRef: MatDialogRef<DetailProjectComponent>,
              private projectService: ProjectManagementService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super(injector, projectService, dialogRef);
    this.dialogId = dialogData?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId,this.handleCoverTimeToString)
    }
  }
  ngOnInit(): void {
  }

}
