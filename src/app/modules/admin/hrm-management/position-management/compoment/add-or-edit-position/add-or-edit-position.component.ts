import {Component, Inject, Injector, OnInit,} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PositionService} from '@shared/services/position.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-add-or-edit-position',
  templateUrl: './add-or-edit-position.component.html',
  styleUrls: ['./add-or-edit-position.component.scss']
})
export class AddOrEditPositionComponent extends BaseComponent implements OnInit {
  dialogId: any;
  formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(50)]],
    description: [null, Validators.maxLength(500)],
    status: [1, Validators.required],
  });
  constructor(injector: Injector,
              public dialogRef: MatDialogRef<AddOrEditPositionComponent>,
              private positionService: PositionService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, positionService, dialogRef);
    this.dialogId = data?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId);
    }
  }

  ngOnInit(): void {
  }

  save(data) {
    data.id = this.dialogId || null;
    this.addOrEdit(data);
  }
}
