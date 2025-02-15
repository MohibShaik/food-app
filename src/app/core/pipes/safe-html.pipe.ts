import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(
    private sanitized: DomSanitizer,
    private currencyPipe: CurrencyPipe
  ) {} // Inject CurrencyPipe

  transform(
    value: number,
    currencyCode: string = 'USD',
    display: string | boolean = 'symbol',
    digitsInfo: string = '1.2-2'
  ): SafeHtml {
    // Add currency formatting parameters
    const formattedPrice = this.currencyPipe.transform(
      value,
      currencyCode,
      display,
      digitsInfo
    ); // Format with CurrencyPipe
    if (!formattedPrice) return this.sanitized.bypassSecurityTrustHtml('');
    const [integerPart, decimalPart] = formattedPrice.split('.'); // Split after currency formatting
    const htmlString = `${integerPart}<sup>.${decimalPart}</sup>`;
    return this.sanitized.bypassSecurityTrustHtml(htmlString); // Bypass security (if you're sure it's safe)
  }
}
