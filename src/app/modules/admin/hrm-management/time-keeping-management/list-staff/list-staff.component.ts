import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@core/base.component';
import { AchievementService } from '@shared/services/achievement.service';
import { StaffService } from '@shared/services/staff.service';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.scss']
})
export class ListStaffComponent extends BaseComponent implements OnInit {

  listStaff: any;
  imageUrl: any;
  firstStaff:any;
  constructor(injector: Injector,
    public staffService: StaffService,
    private achievementService: AchievementService,
    private router : Router) {
    super(injector, staffService);
  }

  ngOnInit(): void {
    this.doSearch();
  }

  doSearch() {
    this.searchModel = {
      ...this.searchModel,
      page: 0,
      // ...this.formSearch.value,
    };
    this.processSearch(this.searchModel, () => this.callback());
  }

  callback(): void {
    this.firstStaff= this.searchResult.data[0].id;
    this.router.navigate([ `/hrm-management/time-keeping/staff/${this.firstStaff}`]);
    this.searchResult.data.forEach((item) => {
      if (item.imageUrl) {
        this.convertBase64(item.imageUrl, item);
      }
    })
  }


  convertBase64(imageUrl: any, item: any): void {
    if (imageUrl) {
      this.achievementService.downloadFile(imageUrl).subscribe((res1) => {
        item.imageUrl = this._sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(res1.body)
        );
      });
    }

  }

}
