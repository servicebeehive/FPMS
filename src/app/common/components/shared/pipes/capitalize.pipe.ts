import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const convertedValue = value.charAt(0).toUpperCase() + value.slice(1);
    return convertedValue;
  }

}
