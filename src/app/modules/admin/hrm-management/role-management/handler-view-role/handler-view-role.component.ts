import { BaseComponent } from './../../../../../core/base.component';
import { data } from 'autoprefixer';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-handler-view-role',
  templateUrl: './handler-view-role.component.html',
  styleUrls: ['./handler-view-role.component.scss'],
})
export class HandlerViewRoleComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({});
  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<HandlerViewRoleComponent>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { data: any }
  ) {
    super(injector);
    this.handleCoverTimeToString(this.data.data);
  }

  ngOnInit(): void {}
}
