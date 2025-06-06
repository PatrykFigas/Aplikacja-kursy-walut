import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyComponent } from './currency.component';
import { CurrencyService } from '../../services/currency.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;
  let mockService: jasmine.SpyObj<CurrencyService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('CurrencyService', ['getTodayRates', 'getRatesForPeriod']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, CurrencyComponent],
      providers: [{ provide: CurrencyService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on ngOnInit and set availableCurrencies', () => {
    const mockData = {
      rates: [{ currency: 'Euro', code: 'EUR', mid: 4.5 }],
      effectiveDate: '2025-06-06'
    };

    mockService.getTodayRates.and.returnValue(of(mockData));
    component.ngOnInit();

    expect(mockService.getTodayRates).toHaveBeenCalled();
    expect(component.availableCurrencies.length).toBe(1);
    expect(component.currencyCode).toBe('EUR');
  });

  it('should fetch rates correctly from service', () => {
    const mockResponse = {
      rates: [
        { effectiveDate: '2025-06-05', mid: 4.5 },
        { effectiveDate: '2025-06-06', mid: 4.55 }
      ],
      currency: 'Euro'
    };

    component.currencyCode = 'EUR';
    component.startDate = '2025-06-01';
    component.endDate = '2025-06-10';

    mockService.getRatesForPeriod.and.returnValue(of(mockResponse));
    component.fetchRates();

    expect(mockService.getRatesForPeriod).toHaveBeenCalledWith('EUR', '2025-06-01', '2025-06-10');
    expect(component.rates.length).toBe(2);
    expect(component.rates[0].rate).toBe(4.5);
    expect(component.rates[1].rate).toBe(4.55);
    expect(component.currencyName).toBe('Euro');
  });
});
