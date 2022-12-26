import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleManagementService } from '@shared/services/role-management.service';

@Component({
  selector: 'app-handler-delete-role',
  templateUrl: './handler-delete-role.component.html',
  styleUrls: ['./handler-delete-role.component.scss'],
})
export class HandlerDeleteRoleComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HandlerDeleteRoleComponent>,
    public roleManagementService: RoleManagementService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
