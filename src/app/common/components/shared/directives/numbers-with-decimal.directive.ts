import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersWithDecimal]'
})
export class NumbersWithDecimalDirective {

  public regex: RegExp = new RegExp(/^\d*\.?\d{0,6}$/g);
  public sepcialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(public _el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.sepcialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this._el.nativeElement.value;
    const position = this._el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key === 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
