import {Injectable, Injector, Inject, ChangeDetectorRef, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogConfig} from '@angular/material/dialog/dialog-config';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {take} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IColumn} from '@layout/common/data-table/data-table.component';
import {TranslocoService} from '@ngneat/transloco';
import {BaseService} from '@core/base.service';
import {CommonUtilsService} from '@shared/common-utils.service';
import {DomSanitizer} from "@angular/platform-browser";
import {SUCCESS_CODE} from "@core/config/constant";




@Injectable()
export class BaseComponent {
  formGroup: FormGroup;
  columns: IColumn[] = [];
  searchModel: any = {
    page: 0,
    pageSize: 10,
  };
  searchResult: any = {
    data: [],
    totalRecords: 0,
  };
  pageIndex: any;
  listTimeType = ['createdDate', 'modifiedDate', 'expectEndTime', 'actualEndTime', 'dateOfBirth', 'leaveDate', 'staOfficalDate', 'hireDate', 'staDate', 'endDate'];

  public snackBar: MatSnackBar;
  public cdr: ChangeDetectorRef;
  public translocoService: TranslocoService;
  public dialogService: MatDialog;
  public _sanitizer: DomSanitizer;
  public fb: FormBuilder;
  private baseService: BaseService;
  public dialogRef: MatDialogRef<any>;
  public detailsData: any;

  constructor(
    injector: Injector,
    service?: BaseService,
    dialogRef?: MatDialogRef<any>
  ) {
    this.snackBar = injector.get(MatSnackBar);
    this.cdr = injector.get(ChangeDetectorRef);
    this.translocoService = injector.get(TranslocoService);
    this.dialogService = injector.get(MatDialog);
    this._sanitizer = injector.get(DomSanitizer);
    this.fb = injector.get(FormBuilder);
    this.baseService = service;
    this.dialogRef = dialogRef;
  }

  showSnackBar(messages?: string, type?: string): void {
    this.snackBar.open(messages, null, {
      panelClass:
        type === 'success'
          ? 'bg-lime-500'
          : type === 'warning'
          ? 'bg-yellow-500'
          : 'bg-red-500',
    });
  }

  showDialog(
    component?: any,
    options: MatDialogConfig = {},
    callback?: any
  ): any {
    const ref = this.dialogService.open(component, {
      width: '30vw',
      ...options,
    });
    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((value) => {
        callback && callback(value);
      });
  }

  closeDial0g(): void {
    this.dialogService.closeAll();
  }

  handleCoverTimeToString(data): void {
      this.listTimeType.forEach((item) => {
        if (data[item]) {
          data[item] = CommonUtilsService.dateToString(data[item]);
        }
      });
  }

  handleCoverStringToDate(data): void {
    this.listTimeType.forEach((item) => {
      if (data[item]) {
        data[item] = CommonUtilsService.stringToDate(
          CommonUtilsService.dateToString(data[item])
        );
      }
    });
  }

  getDetails(id, callback?): void {
    this.baseService.getOne(id).subscribe((res) => {
      if (res.code === '00') {
        this.detailsData = res.data;
        console.log(res);
        this.handleCoverStringToDate(this.detailsData);
        if (this.formGroup) {
          this.formGroup.patchValue(this.detailsData);
          this.formGroup.markAllAsTouched();
        }
        if (callback) {
          callback(this.detailsData);
        }

      } else {
        this.showSnackBar(res.message, 'error');
        this.dialogService.closeAll();
      }
    });
  }

  processSearch(searchModel, callback?): void {
    this.baseService.search(searchModel).subscribe((res) => {
      if ('00' === res.code) {
        this.searchResult.data = res.data;
        this.searchResult.totalRecords = res.totalRecords;
        this.pageIndex = this.searchModel.page;
        if (callback) {
          callback();
        }
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  changePage(e: any): void {

    this.searchModel.pageSize = e.pageSize;
    this.searchModel.page = e.pageIndex;
    this.processSearch(this.searchModel);
  }

  create(data: any, onSuccess?: any, onError?: any): void {
    this.baseService.save(data).subscribe((res) => {
      if ('00' === res.code) {
        this.showSnackBar(res.message, 'success');
        this.dialogRef.close(data);
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  edit(data: any, onSuccess?: any, onError?: any): void {
    this.baseService.update(data).subscribe((res) => {
      if ('00' === res.code) {
        this.showSnackBar(res.message, 'success');
        this.dialogRef.close(data);
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  addOrEdit(data?: any): void {
    if (data.id) {
      this.edit(data);
    } else {
      this.create(data);
    }
  }

  deleteConfirmDialog(id?: any): any {
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if (value) {
        this.delete(id);
      }
    });
  }

  delete(id: any): void {
    this.baseService.delete(id).subscribe((res) => {
      if (res.code === '00') {
        this.showSnackBar('Xóa thành công', 'success');
        this.searchModel.page = 0;
        this.processSearch(this.searchModel);
      } else {
        this.showSnackBar(res.message, 'error');
      }
    });
  }

  isSuccess(res): boolean {
    return res.code === SUCCESS_CODE;
  }
}
