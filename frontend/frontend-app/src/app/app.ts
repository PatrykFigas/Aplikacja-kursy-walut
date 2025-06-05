import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyComponent } from './components/currency/currency.component'; // dodaj ten import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyComponent], // dodaj tutaj CurrencyComponent
  templateUrl: './app.html',
})
export class AppComponent {}

