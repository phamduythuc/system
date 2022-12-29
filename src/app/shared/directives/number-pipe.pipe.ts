import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'numberPipe'})

export class NumberCustomPipe implements PipeTransform {
  transform(value: any) {
    if(value){
      return (value.toLocaleString() + ' đ');

    }
  }
}
