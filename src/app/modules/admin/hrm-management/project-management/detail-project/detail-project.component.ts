import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DepartmentService} from '@shared/services/department.service';
import {ProjectService} from '@shared/services/project.service';
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
              private projectService: ProjectService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super(injector, projectService, dialogRef);
    this.dialogId = dialogData?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId, this.handleCoverTimeToString);
    }
  }
  ngOnInit(): void {
  }

}
