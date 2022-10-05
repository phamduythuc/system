import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-detail-position',
  templateUrl: './detail-position.component.html',
  styleUrls: ['./detail-position.component.scss']
})
export class DetailPositionComponent implements OnInit {
  position: any

  constructor(
    private transloco:TranslocoService,
    private dialogRef: MatDialogRef<DetailPositionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.position = data?.position
  }

  ngOnInit(): void {
  }

}
