import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalizeFirst]',
  standalone: true
})
export class CapitalizeFirstDirective {

  constructor(
    private element: ElementRef<HTMLInputElement | HTMLTextAreaElement >,
  ) { }

  @HostListener('blur') onBlur() {
    const input = this.element.nativeElement;
    const value = input.value;
    if (value) {
      input.value = value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase();
      const event = new Event('input', { bubbles: true }); // notify form control
      input.dispatchEvent(event);
    }
  }

}
