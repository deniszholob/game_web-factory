import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appClampPercent', standalone: true })
export class ClampPercentPipe implements PipeTransform {
  public transform(value?: number): number {
    if (value == null) return 0;
    // Clamp the value between 0 and 99
    const clampedValue: number = Math.min(Math.max(value, 0), 99);
    // Convert to decimal
    return clampedValue / 100;
  }
}
