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
  constructor(injector: Injector,
    dialogRef: MatDialogRef<EditLeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(injector,null,dialogRef)
      this.listMembers=data;
     }

  ngOnInit(): void {
   
  }

}
