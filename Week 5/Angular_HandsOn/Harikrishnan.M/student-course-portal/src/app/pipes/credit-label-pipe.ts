import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe to format credit numbers into human-readable strings.
 * Handles edge cases like null, undefined, or 0.
 * Pipes are pure by default (only re-run when input reference changes).
 */
@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value <= 0) {
      return 'No Credits';
    }
    if (value === 1) {
      return '1 Credit';
    }
    return `${value} Credits`;
  }
}
