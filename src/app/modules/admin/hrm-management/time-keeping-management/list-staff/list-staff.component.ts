import { Component, Injector, OnInit } from '@angular/core';
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
  constructor(injector: Injector,
    public staffService: StaffService,
    private achievementService: AchievementService,) {
    super(injector, staffService);
  }

  ngOnInit(): void {
    this.doSearch()
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
