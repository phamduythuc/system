import {Directive, Inject, Input, Optional} from '@angular/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {CustomDateFormat, DateDisplay, DateParse} from '@shared/custom-date-format';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[datePickerFormat]',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useClass: CustomDateFormat
    }
  ]
})
export class DatePickerFormatDirective {

  @Input() public configDateParse: DateParse;
  @Input() public configDateDisplay: DateDisplay;

  @Input('datePickerFormat')
  set datePickerFormat(format: string) {
    if (this.configDateParse) {
      this.matDateFormat.updateDateFormat(
        this.configDateParse,
        this.configDateDisplay
      );
    } else {
      this.matDateFormat.updateDateFormat({ dateInput: format });
    }

    const value = this.ngControl.value;
    this.ngControl.valueAccessor?.writeValue(value);
  }

  constructor(
    @Inject(MAT_DATE_FORMATS) public matDateFormat: CustomDateFormat,
    @Optional() private ngControl: NgControl
  ) {}

}
