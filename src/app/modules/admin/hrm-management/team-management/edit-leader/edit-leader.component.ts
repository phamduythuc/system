import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';

@Component({
  selector: 'app-edit-leader',
  templateUrl: './edit-leader.component.html',
  styleUrls: ['./edit-leader.component.scss']
})
export class EditLeaderComponent extends BaseComponent implements OnInit {
  listMembers: any;
  leadId: string = '';
  constructor(injector: Injector,
    dialogRef: MatDialogRef<EditLeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, null, dialogRef);
  }


  ngOnInit(): void {
    this.listMembers = this.data.listMember;
    if (this.data.leadId) {
      this.leadId = this.data.leadId.toString();
    }
  }

  changeLeader(event: any) {

  }
  save(){
    console.log(this.leadId)
    this.dialogRef.close()
  }

}
