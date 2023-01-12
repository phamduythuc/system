import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[alphabetOnly]'
})
export class AlphabetOnlyDirective {

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const sanitized = input.value.replace(/[^a-zA-Z0-9_.-]*/g, '');
    input.value = sanitized.toUpperCase();
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    input.value = '';
  }
}
