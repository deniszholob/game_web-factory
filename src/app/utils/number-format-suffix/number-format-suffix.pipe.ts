import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appNumberFormatSuffix', standalone: true })
export class NumberFormatSuffixPipe implements PipeTransform {
  public transform(value?: number | null, decimals: number = 2): string | null {
    if (value === null || value === undefined) return null;

    if (value < 1000) {
      return (
        Number.isInteger(value) ? value : value.toFixed(decimals)
      ).toString();
    }

    decimals = 1;
    // TODO, make max of 3 gigits

    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
    const suffixIndex = Math.floor(Math.log10(value) / 3);
    const scaledValue = value / Math.pow(1000, suffixIndex);
    const shortValue = (
      Math.floor(scaledValue * Math.pow(10, decimals)) / Math.pow(10, decimals)
    ).toFixed(decimals);

    // return shortValue + suffixes[suffixIndex];

    return `${shortValue}${suffixes[suffixIndex - 1]}`;
  }
}
