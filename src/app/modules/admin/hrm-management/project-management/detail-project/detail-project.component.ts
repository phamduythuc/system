import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DepartmentService} from '@shared/services/department.service';
import {ProjectService} from '@shared/services/project.service';
import {BaseComponent} from '@core/base.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent extends BaseComponent implements OnInit {
  private readonly dialogId: any;
  listPartners: any = [];

  option = {
    page: 0,
    pageSize: 999999,
  };
  numberChars = new RegExp('[.,]', 'g');


  constructor(injector: Injector,
              public dialogRef: MatDialogRef<DetailProjectComponent>,
              private projectService: ProjectService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private decimalPipe: DecimalPipe
    ) {
    super(injector, projectService, dialogRef);
    this.dialogId = dialogData?.id;
    if(this.dialogId){
      this.getDetails(this.dialogId);
    }
  }
  ngOnInit(): void {
    this.getListPartnerName();
  }

  formatCurrency(val: any) {
    return this.decimalPipe.transform(val, '1.0', 'en-US');
  }

  getListPartnerName() {
    this.projectService.getPartner(this.option).subscribe((res) => {
      if (res.code === '00') {
        this.detailsData.unitPrice =
          this.formatCurrency(this.detailsData.unitPrice);
        this.detailsData.budget =
          this.formatCurrency(this.detailsData.budget);
        this.listPartners = res.data;
        this.listPartners.map((x: any) => {
          x.id = Number(x.id);
          if (Number(x?.id) === this.detailsData?.partnerId) {
            this.detailsData.partnerName = x.name;
          }
          return x;
        });
        this.listPartners.forEach(
          (item) => (item.id = Number(item.id))
        );
      }
    });
  }
}
