import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CurrencyRate {
  currency: string;
  code: string;
  mid: number;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getTodayRates(): Observable<{ rates: CurrencyRate[]; effectiveDate: string }> {
    return this.http
      .get<any[]>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json')
      .pipe(
        map((res) => ({
          rates: res[0].rates,
          effectiveDate: res[0].effectiveDate,
        }))
      );
  }
}
