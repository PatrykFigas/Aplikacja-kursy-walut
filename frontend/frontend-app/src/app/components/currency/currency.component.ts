import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency.html',
  styleUrls: ['./currency.css']
})
export class CurrencyComponent implements OnInit {
  exchangeRates: any[] = [];
  filteredRates: any[] = [];
  publishDate: string = '';
  searchTerm: string = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe(data => {
      console.log('Odebrane dane z API NBP:', data);
      this.exchangeRates = data[0]?.rates || [];
      this.filteredRates = [...this.exchangeRates];
      this.publishDate = data[0]?.effectiveDate || '';
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRates = this.exchangeRates.filter(rate =>
      rate.currency.toLowerCase().includes(term) || rate.code.toLowerCase().includes(term)
    );
  }
}
