import {ChangeDetectorRef, Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../../core/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingService} from "../../setting.service";
import {Validators} from "@angular/forms";
import {AuthorizationService} from "../authorization.service";

@Component({
  selector: 'app-add-or-edit-auth',
  templateUrl: './add-or-edit-auth.component.html',
  styleUrls: ['./add-or-edit-auth.component.scss']
})
export class AddOrEditAuthComponent extends BaseComponent implements OnInit {
  roleId: any;
  formGroup = this.fb.group({
    name: [null, [Validators.required]],
    description: [null]
  });

  constructor(injector: Injector, public dialogRef: MatDialogRef<AddOrEditAuthComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authorizationService: AuthorizationService) {
    super(injector, authorizationService);
    this.roleId = data?.roleId;
    if (this.roleId) {
      this.getDetails(this.roleId)
    }
  }

  ngOnInit(): void {
  }



  save(data) {
    console.log(this.searchModel)
    if(this.roleId){
      data.id = this.roleId
    }
    this.addOrEdit(data)
  }
}
