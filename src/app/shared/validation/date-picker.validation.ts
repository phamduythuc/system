import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
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

//#region ThaiNt Validate starDate - EndDate
export function creatDateRangeValidator(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
      const start: any = form.value["startMonth"];
      const end: any =form.value["endMonth"];
      if (start && end) {
          const isRangeValid = (end.diff(start) > 0);
          return isRangeValid ? null : { dateRange: true };
      }
      return null;
  }
}
//#endregion
