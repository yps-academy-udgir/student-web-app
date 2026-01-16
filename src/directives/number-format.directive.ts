import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appNumberFormat]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberFormatDirective,
      multi: true
    }
  ]
})
export class NumberFormatDirective implements ControlValueAccessor {
  @Input() groupSize: number = 0;
  @Input() separator: string = ' ';
  @Input() maxLength: number = 10;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Keep only digits
    let raw = input.value.replace(/\D/g, '');

    // ✅ Enforce maxLength
    if (this.maxLength > 0 && raw.length > this.maxLength) {
      raw = raw.substring(0, this.maxLength);
    }

    const formatted = this.formatValue(raw);

    // update UI with formatted value
    this.el.nativeElement.value = formatted;

    // propagate RAW value (safe for backend)
    this.onChange(raw);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    if (value == null) {
      this.el.nativeElement.value = '';
    } else {
      let raw = value.toString().replace(/\D/g, '');
      if (this.maxLength > 0 && raw.length > this.maxLength) {
        raw = raw.substring(0, this.maxLength);
      }
      this.el.nativeElement.value = this.formatValue(raw);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  private formatValue(value: string): string {
    if (this.groupSize <= 0) return value;

    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % this.groupSize === 0) {
        formatted += this.separator;
      }
      formatted += value[i];
    }
    return formatted;
  }
}
