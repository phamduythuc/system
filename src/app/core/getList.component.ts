import { Injectable, Injector } from '@angular/core';
import { CommonUtilsService } from '@shared/common-utils.service';
import { AchievementService } from '@shared/services/achievement.service';
import { ContractService } from '@shared/services/contract.service';
import { BaseComponent } from './base.component';

@Injectable()
export class GetListComponent extends BaseComponent {

  type_contract = [
    {
      type: 1,
      name: 'Hợp đồng lao động chính thức',
    },
    {
      type: 2,
      name: 'Hợp đồng cộng tác viên',
    },
    {
      type: 3,
      name: 'Hợp đồng thực tập sinh',
    },
  ];

  constructor(
    injector: Injector,
    public ContractService: ContractService,
    public achievementService: AchievementService
  ) {
    super(injector, ContractService);
  }

  getTypeContract(type): any {
    this.type_contract = JSON.parse(localStorage.getItem('listType')).CONTACT_TYPE;
    let value: any;

    this.type_contract.map((x:any) => {
      if (x.code == type) {
        value = x.name;
      }
    });
    return value;
  }

  convertFileURL(url): void {
    let data: any;
    if (url) {
      this.achievementService.renderFile({
        filePath: url,
        fileType: 1
      }).subscribe((res1) => {
        data = this._sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(res1.body)
        );
      });
    }
    return data
  }

}
