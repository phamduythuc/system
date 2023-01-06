import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import moment from 'moment';

@Component({
  selector: 'app-edit-leader',
  templateUrl: './edit-leader.component.html',
  styleUrls: ['./edit-leader.component.scss']
})
export class EditLeaderComponent extends BaseComponent implements OnInit {
  listMembers: any;
  leadId: any;
  teamId: any;
  sprint: any;
  updateLeaderModel = {
    sprintMonth: '',
    staffId: 0,
    teamId: 0
  }
  constructor(injector: Injector,
    dialogRef: MatDialogRef<EditLeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, null, dialogRef);
  }


  ngOnInit(): void {
    this.listMembers = this.data.listMember;
    if (this.data.leadId) {
      this.leadId = this.data.leadId.toString();
      this.teamId = this.data.id;
      this.sprint = moment(this.data.sprint).format("01/MM/YYYY");
    }
  }

  changeLeader(event: any) {
    this.leadId = event
  }
  save() {
    this.updateLeaderModel = {
      sprintMonth: this.sprint,
      staffId: parseInt(this.leadId),
      teamId: parseInt(this.teamId),
    }
    console.log(this.updateLeaderModel)
    this.dialogRef.close()
  }

}
