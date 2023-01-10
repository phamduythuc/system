import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textSlice' })
export class TextSlicePipe implements PipeTransform {
  transform(value: any,numberSlice:number) {
    if(value){
      if (value.length > numberSlice) {
        return value.slice(0, numberSlice) + '...';
      } else {
        return value;
      }
    }
    
  }
}