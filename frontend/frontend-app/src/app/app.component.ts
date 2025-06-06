import { Component } from '@angular/core';
import { CurrencyComponent } from './components/currency/currency.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyComponent],
  template: `<app-currency></app-currency>`,
  styleUrls: ['./app.css'],
})
export class AppComponent {}
