import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonUtilsService } from '@shared/common-utils.service';

export function datePickerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = CommonUtilsService.dateToString(control.value)
    if (value) {
      return null;
    }else{
        return { datePickerFormat: true }
    }
  };
}
