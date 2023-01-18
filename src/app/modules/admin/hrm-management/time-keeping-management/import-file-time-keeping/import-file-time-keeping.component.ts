import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base.component';
import { TeamService } from '@shared/services/team.service';
import { TimeKeepingService } from '@shared/services/time-keeping.service';

@Component({
  selector: 'app-import-file-time-keeping',
  templateUrl: './import-file-time-keeping.component.html',
  styleUrls: ['./import-file-time-keeping.component.scss']
})
export class ImportFileTimeKeepingComponent extends BaseComponent implements OnInit {
  value = 'Clear me';
  visibleBtnUpload: boolean = true;
  documentName: any = '';
  formGroup = this.fb.group({
    timeKeepImport: ['thai'],
    file: [],
  });
  constructor(injector: Injector,
    public timeKeepingService: TimeKeepingService,
    dialogRef: MatDialogRef<ImportFileTimeKeepingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, timeKeepingService, dialogRef);
  }

  ngOnInit(): void {
  }

  uploadFile(event: any): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.formGroup.patchValue({ file });
      reader.onload = () => {
        // this.recordUrl = reader.result;
        this.documentName = file.name;
        this.visibleBtnUpload = !this.visibleBtnUpload;
      };
    }
  }

  save() {
    const formData = new FormData();
    const formValue = this.formGroup.value['timeKeepImport'];
    formData.append('file', this.formGroup.get('file').value || null);
    formData.append(
      'timeKeepImport', formValue
    );
    this.timeKeepingService.importTimeKeeping(formData).subscribe((res) => {
      const resp = decodeURIComponent(res.headers.get('Content-Response'));
      const obj = JSON.parse(resp);
      if ('00' === obj.code) {
        this.showSnackBar(obj.message, 'success');
      } else {
        this.showSnackBar(obj.message, 'error');
      }
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
