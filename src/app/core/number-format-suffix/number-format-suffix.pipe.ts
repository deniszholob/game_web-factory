import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appNumberFormatSuffix', standalone: true })
export class NumberFormatSuffixPipe implements PipeTransform {
  public transform(value: number, decimals: number = 2): string | null {
    if (value === null || value === undefined) return null;

    if (value < 1000) {
      return value.toString();
    }

    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
    const suffixIndex = Math.floor(Math.log10(value) / 3);
    const shortValue = (value / Math.pow(1000, suffixIndex)).toFixed(decimals);

    return `${shortValue}${suffixes[suffixIndex - 1]}`;
  }
}
