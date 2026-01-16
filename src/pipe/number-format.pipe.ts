import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'numberFormat',
    standalone: true
})

export class NumberFormatPipe implements PipeTransform{
  transform(value: string | number, groupSize: number, separator: string = ''){
    if(!value) return '';
    const digits = value.toString().replace(/\D/g, '');
    if (groupSize <= 0) return digits;
    let formatted = '';
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % groupSize === 0) {
        formatted += separator;
      }
      formatted += digits[i];
    }
    return formatted;
  }
}