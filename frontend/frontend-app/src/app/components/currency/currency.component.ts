import { Component, OnInit } from '@angular/core';
import { CurrencyService, CurrencyRate } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent implements OnInit {
  availableCurrencies: CurrencyRate[] = [];
  currencyCode = '';
  currencyName = '';
  startDate = '';
  endDate = '';
  rates: { date: string; rate: number }[] = [];
  error = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getTodayRates().subscribe({
      next: (data) => {
        this.availableCurrencies = data.rates;
        if (this.availableCurrencies.length > 0) {
          this.currencyCode = this.availableCurrencies[0].code;
        }
      },
      error: () => {
        this.error = 'Nie udało się pobrać listy walut.';
      },
    });
  }

  fetchRates(): void {
    this.error = '';
    if (!this.currencyCode || !this.startDate || !this.endDate) {
      this.error = 'Uzupełnij wszystkie pola.';
      return;
    }

    this.currencyService
      .getRatesForPeriod(this.currencyCode, this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.rates = data.rates.map((r: any) => ({
            date: r.effectiveDate,
            rate: r.mid,
          }));
          this.currencyName = data.currency;
        },
        error: () => {
          this.rates = [];
          this.error = 'Nie udało się pobrać danych. Sprawdź daty i kod waluty.';
        },
      });
  }
}
