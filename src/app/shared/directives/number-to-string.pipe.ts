import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'numberToStringPipe'})

export class NumberToStringPipe implements PipeTransform {
  transform(value: any) {
    if(value){
      return (value.toLocaleString());

    }
  }
}
