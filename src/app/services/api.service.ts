import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentAPI } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICurrencyExchangeAPIResponse } from '../modules/common/types/app-types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  latestExchangeRateURL = 'https://api.currencyapi.com/v3/latest';
  apiKeyHeader: HttpHeaders = new HttpHeaders({
    apiKey: environmentAPI.currencyApiKey,
  });
  constructor(private http: HttpClient) {}
  getConversionRate(from: string, to: string): Observable<ICurrencyExchangeAPIResponse> {
    return this.http.get(`${this.latestExchangeRateURL}?base_currency=${from}&currencies=${to}`, {
      headers: this.apiKeyHeader,
    }) as Observable<ICurrencyExchangeAPIResponse>;
  }
}
