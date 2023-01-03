import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSelectBox'
})
export class SearchSelectBoxPipe implements PipeTransform {

  transform(listStaff: any[], searchTxt: string): any[] {
    if(!listStaff || !listStaff.length) return listStaff;
    if(!searchTxt || !searchTxt.length) return listStaff;
    return listStaff.filter(item => {
      return item.viewValue.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });
  }

}
