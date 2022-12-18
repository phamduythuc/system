import { data } from 'autoprefixer';
import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-handler-view-role',
  templateUrl: './handler-view-role.component.html',
  styleUrls: ['./handler-view-role.component.scss']
})
export class HandlerViewRoleComponent implements OnInit {
  [x: string]: any;


  constructor(  public dialogRef: MatDialogRef<HandlerViewRoleComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {data: any}) { 
      this.formUser = fb.group({
        name: ["", Validators.required]
    });
    }
  ;
  ngOnInit(): void {
    console.log(this.data.data);
  }
}
