import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '@core/categories.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StaffService} from '@shared/services/staff.service';
import {AchievementService} from '@shared/services/achievement.service';

@Component({
  selector: 'app-add-or-edit-staff',
  templateUrl: './add-or-edit-staff.component.html',
  styleUrls: ['./add-or-edit-staff.component.scss']
})
export class AddOrEditStaffComponent extends BaseComponent implements OnInit {
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.ibb.co/fDWsn3G/buck.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;
  private readonly dialogId: any;
  formGroup: FormGroup;
  projectTypes: any[] = [];
  projects: any[] = [];
  listPartner: any[] = [];
  genderCategories: any[] = [];
  maritalCategories: any[] = [];
  religionCategories: any[] = [];
  staffStatusCategories: any[] = [];
  categoriesList = ['GENDER', 'MARITAL_STAtUS', 'RELIGION', 'STAFF_STATUS'];
  listPositions: any;
  listStaffLevels: any;
  listDepartment: any;

  constructor(injector: Injector,
              private categoriesService: CategoriesService,
              public dialogRef: MatDialogRef<AddOrEditStaffComponent>,
              private staffService: StaffService,
              private achievementService: AchievementService,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, staffService, dialogRef);
    this.formGroup = this.fb.group({
      //Địa chỉ đầy đủ
      address: [],
      //Email của công ty
      companyEmail: [],
      //Tên quốc gia
      country: [],
      //Người tạo
      createdBy: [],
      //Ngày giờ tạo
      createdDate: [],
      //Đường dẫn file CV
      cvUrl: [],
      //Ngày sinh
      dateOfBirth: [null, Validators.required],
      //Mã phòng ban
      departmentId: [null, Validators.required],
      //Chỗ ở hiện tại
      domicile: [],
      //Cấp bậc giáo dục
      education: [],
      //Email cá nhân
      email: [],
      //Thông tin liên lạc khẩn cấp
      emergencyUser: [],
      //Dân tộc
      ethnic: [],
      //Họ và tên
      fullName: [null, Validators.required],
      //Giời tính
      gender: [null, Validators.required],
      //Ngày tuyển dụng
      hireDate: [],
      //Mã chấm công của công ty
      idNhanVienChamCong: [],
      //Đường dẫn ảnh của nhân viên
      imageUrl: [],
      //Ngày nghỉ
      leaveDate: [],
      //Mã cấp bậc
      levelId: [null, Validators.required],
      //Tình trạng hôn nhân
      maritalStatus: [],
      //Người cập nhâật
      modifiedBy: [],
      //Ngày giờ cập nhật
      modifiedDate: [],
      //Mã căn cước công dân/Chứng minh nhân dân
      nationalId: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      //Quốc gia
      nationality: [],
      //Số điện thoại
      phone: [null, [Validators.required, Validators.pattern('(\\(\\+84\\)|0)+([0-9]{9})\\b')]],
      //Mã chức vụ
      positionId: [null, Validators.required],
      //Chức vụ hiện tại
      positionJob: [],
      //Tôn giáo
      religion: [],
      //N/A
      seniority: [],
      //Ngày bắt đầu đi làm
      staOfficalDate: [null, Validators.required],
      //Mã nhân viên
      staffCode: [null, Validators.required],
      //Trạng thái của nhân viên
      staffStatus: [null],
      //Trạng thái
      status: [],
      //Mô tả tổng quan
      summary: [],
      //Tên đăng nhập
      username: [null, Validators.required],
      //Kinh nghiệm
      workExperience: [],
      file: [],
    });
    this.getCategories();
    this.dialogId = data?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId, ({imageUrl}) => {
        this.convertBase64(imageUrl);
      });
    }

  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.getListDepartment();
    this.getListStaffLevel();
    this.getListPosition();
  }

  convertBase64(imageUrl): void {
    if (imageUrl) {
      this.achievementService.downloadFile(imageUrl).subscribe(res1 => {
        this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res1.body));
      });
    }
  }

  getCategories(): void {
    this.categoriesList.forEach(item => {
      this.categoriesService.getCategories(item).subscribe(res => {
        switch (item) {
          case 'GENDER':
            this.genderCategories = res.data;
            break;
          case 'MARITAL_STAtUS':
            this.maritalCategories = res.data;
            break;
          case 'RELIGION':
            this.religionCategories = res.data;
            break;
          case 'STAFF_STATUS':
            this.staffStatusCategories = res.data;
            break;
          default:
            break;
        }
      });
    });
  }

  getListPosition(): void {
    this.staffService.getListPosition(this.searchModel).subscribe(res => {
      this.listPositions = res.data;
    });
  }

  getListStaffLevel() {
    this.staffService.getListStaffLevel(this.searchModel).subscribe(res => {
      this.listStaffLevels = res.data;
    });
  }

  getListDepartment() {
    this.staffService.getListDepartment(this.searchModel).subscribe(res => {
      this.listDepartment = res.data;
    });
  }

  save(data) {
    this.handleCoverTimeToString(data);
    if (this.dialogId) {
      data.id = this.dialogId;
      const formData = new FormData();
      formData.append('file', this.formGroup.get('file').value || null);
      formData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
      this.staffService.updateStaff(formData).subscribe(res => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.dialogRef.close(data);
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    } else {
      const formData = new FormData();
      formData.append('file', this.formGroup.get('file').value || null);
      formData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
      this.staffService.createStaff(data).subscribe(res => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.dialogRef.close(data);
        } else {
          this.showSnackBar(res.message, 'error');
        }
      });
    }
  }

  uploadFile(event): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.formGroup.patchValue({file});
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile(): void {
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.formGroup.patchValue({
      file: [null]
    });
  }
}
