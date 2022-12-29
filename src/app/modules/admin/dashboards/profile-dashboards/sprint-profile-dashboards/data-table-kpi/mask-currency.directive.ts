import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Directive({
  selector: '[formControlName][maskCurrency]'
})
export class MaskCurrencyDirective {

  constructor(public ngControl: NgControl) {
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }


  onInputChange(value, backspace) {
    if (!isNotNullOrUndefined(value)) {
      this.ngControl.valueAccessor.writeValue('');
    }
    let scaleValue;
    const lastIndexDot = value.lastIndexOf('.');
    if (lastIndexDot > 0) {
      scaleValue = value.substr(lastIndexDot + 1).replace(/\D/g, '');
      value = value.substr(0, lastIndexDot).replace(/\D/g, '');
    }
    let newVal = value.replace(/\D/g, '');
    newVal = String(newVal).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    if (lastIndexDot > 0) {
      this.ngControl.valueAccessor.writeValue([newVal, scaleValue].join('.'));
    } else {
      this.ngControl.valueAccessor.writeValue(newVal);
    }

  }

}