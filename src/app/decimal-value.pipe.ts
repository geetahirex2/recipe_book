import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalValue',
})
export class DecimalValuePipe implements PipeTransform {
  transform(value: any) {
    value = Number(value);
    //console.log(value%1);
    if (value % 1 !== 0) {
      return Number(value);
    } else return Number(value + '.00');
  }
}
