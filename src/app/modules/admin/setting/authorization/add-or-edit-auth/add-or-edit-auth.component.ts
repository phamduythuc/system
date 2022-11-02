import {ChangeDetectorRef, Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../core/base.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SettingService} from '../../setting.service';
import {Validators} from '@angular/forms';
import {AuthorizationService} from '@shared/services/authorization.service';

@Component({
  selector: 'app-add-or-edit-auth',
  templateUrl: './add-or-edit-auth.component.html',
  styleUrls: ['./add-or-edit-auth.component.scss']
})
export class AddOrEditAuthComponent extends BaseComponent implements OnInit {
  roleData: any;
  formGroup = this.fb.group({
    name: [null, [Validators.required,Validators.pattern('^[A-Z0-9\\_]+$')]],
    description: [null]
  });

  constructor(injector: Injector, public dialogRef: MatDialogRef<AddOrEditAuthComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authorizationService: AuthorizationService) {
    super(injector, authorizationService);
    this.roleData = data?.roleData;
    this.formGroup.patchValue(this.roleData)
    console.log(this.roleData);
    console.log(this.formGroup.value);
  }

  ngOnInit(): void {
  }



  save(data) {
    console.log(this.searchModel)
    if(this.roleData){
      data.roleId = this.roleData.roleId;
      data.clientId = this.roleData.clientId;
    }
    this.addOrEdit(data);
  }

  addOrEdit(data?: any): void {
    if (data.roleId) {
      this.edit(data);
    } else {
      this.create(data);
    }
  }
}
