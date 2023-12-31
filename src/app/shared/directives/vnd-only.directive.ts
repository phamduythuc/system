import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[vnd-currency]'
})
export class VndOnlyDirective {

  currencyChars = new RegExp('[\.,]', 'g'); // we're going to remove commas and dots

  constructor(public el: ElementRef, public renderer: Renderer2, private decimalPipe: DecimalPipe) { }


  @HostListener('input', ['$event.target.value']) onInput(e: string) {
    this.format(e);
  };

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  format(val: string) {
    // 1. test for non-number characters and replace/remove them
    const numberFormat = parseInt(String(val).replace(this.currencyChars, ''), 10);
    // console.log(numberFormat); // raw number

    // 2. format the number (add commas)
    const usd = this.decimalPipe.transform(numberFormat, '1.0', 'en-US');
    // console.log(usd);


    // 3. replace the input value with formatted numbers
    this.renderer.setProperty(this.el.nativeElement, 'value', usd);
  }
}
