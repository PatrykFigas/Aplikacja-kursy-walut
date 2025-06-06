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
  currencies: CurrencyRate[] = [];
  groupedCurrencies: any[] = [];
  publicationDate = '';
  searchTerm = '';
  groupBy: 'none' | 'years' | 'quarters' | 'months' | 'days' = 'none';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getTodayRates().subscribe({
      next: (data: { rates: CurrencyRate[]; effectiveDate: string }) => {
        this.currencies = data.rates;
        this.publicationDate = data.effectiveDate;
        this.groupData();
      },
      error: (err: any) => console.error('Błąd pobierania kursów:', err),
    });
  }

  filteredCurrencies(): CurrencyRate[] {
    if (!this.searchTerm) return this.currencies;

    const term = this.searchTerm.toLowerCase();
    return this.currencies.filter(
      (currency) =>
        currency.currency.toLowerCase().includes(term) ||
        currency.code.toLowerCase().includes(term)
    );
  }

  groupData(): void {
    if (this.groupBy === 'none') {
      this.groupedCurrencies = this.currencies;
      return;
    }

    const grouped = new Map<string, CurrencyRate[]>();

    this.currencies.forEach((entry) => {
      const key = this.getGroupKey(this.publicationDate, this.groupBy);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(entry);
    });

    this.groupedCurrencies = Array.from(grouped.entries()).map(([group, entries]) => ({
      group,
      avg: (entries.reduce((sum, e) => sum + e.mid, 0) / entries.length).toFixed(4),
      count: entries.length,
    }));
  }

  getGroupKey(date: string, type: string): string {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const q = Math.floor((m - 1) / 3) + 1;

    switch (type) {
      case 'years':
        return `${y}`;
      case 'quarters':
        return `Q${q} ${y}`;
      case 'months':
        return `${y}-${String(m).padStart(2, '0')}`;
      case 'days':
        return date;
      default:
        return '';
    }
  }
}
