import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyComponent } from './components/currency/currency.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyComponent],
  templateUrl: './app.html',
})
export class AppComponent {}
