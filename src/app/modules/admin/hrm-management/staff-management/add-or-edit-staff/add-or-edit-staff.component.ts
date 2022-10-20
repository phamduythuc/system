import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {BaseComponent} from "@core/base.component";
import {Validators} from "@angular/forms";
import {CategoriesService} from "@core/categories.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StaffManagementService} from "../staff-management.service";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-add-or-edit-staff',
  templateUrl: './add-or-edit-staff.component.html',
  styleUrls: ['./add-or-edit-staff.component.scss']
})
export class AddOrEditStaffComponent extends BaseComponent implements OnInit {
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  private readonly dialogId: any;
  formGroup = this.fb.group({
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
    staffStatus: [null, Validators.required],
    //Trạng thái
    status: [],
    //Mô tả tổng quan
    summary: [],
    //Tên đăng nhập
    username: [null, Validators.required],
    //Kinh nghiệm
    workExperience: [],
  });
  projectData
  projectTypes: any = [];
  projects: any = [];
  listPartner: any = [];
  genderCategories = []
  maritalCategories = []
  religionCategories = []
  staffStatusCategories = []
  categoriesList = ['GENDER', 'MARITAL_STAtUS', 'RELIGION', 'STAFF_STATUS']
  listPositions: any;
  listStaffLevels: any;
  listDepartment: any;
  imagePath: any;

  constructor(injector: Injector,
              private _sanitizer: DomSanitizer,
              private categoriesService: CategoriesService,
              public dialogRef: MatDialogRef<AddOrEditStaffComponent>,
              private staffService: StaffManagementService,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector, staffService, dialogRef);
    this.getCategories();
    this.dialogId = data?.id;
    if (this.dialogId) {
      this.getDetails(this.dialogId).then(() => {
          // this.handleCoverStringToDate(this.detailsData);
          this.coverBase64(this.detailsData)
        }
      );
    }

  }

  ngOnInit(): void {
    this.searchModel.status = 1;
    this.getListDepartment()
    this.getListStaffLevel()
    this.getListPosition()
  }

  coverBase64(res) {
    console.log(res)
    if (res.imageUrl) {
      this.staffService.getAvatar(res.imageUrl).subscribe(res => {
        // this.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl(res.body);
        this.imageUrl = URL.createObjectURL(res.body);
        console.log(this.imageUrl);
      });

    }
    console.log(this.imagePath)
  }

  getCategories() {
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
      })
    })
  }

  getListPosition() {
    this.staffService.getListPosition(this.searchModel).subscribe(res => {
      this.listPositions = res.data;
    })
  }

  getListStaffLevel() {
    this.staffService.getListStaffLevel(this.searchModel).subscribe(res => {
      this.listStaffLevels = res.data;
    })
  }

  getListDepartment() {
    this.staffService.getListDepartment(this.searchModel).subscribe(res => {
      this.listDepartment = res.data;
    })
  }

  save(data) {
    this.handleCoverTimeToString(data)
    console.log(data);
    if (this.dialogId) {
      data.id = this.dialogId;
      this.staffService.updateStaff(data).subscribe(res => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.dialogRef.close(data);
        } else {
          this.showSnackBar(res.message, 'error');
        }
      })
    } else {
      this.staffService.createStaff(data).subscribe(res => {
        if ('00' === res.code) {
          this.showSnackBar(res.message, 'success');
          this.dialogRef.close(data);
        } else {
          this.showSnackBar(res.message, 'error');
        }
      })
    }
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.formGroup.get('imageUrl').patchValue(
          reader.result
        );
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.formGroup.patchValue({
      file: [null]
    });
  }

  log() {
    console.log(this.formGroup)
  }
}
