import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

export interface HttpOptions<TBody = unknown> {
  body?: TBody;
  params?: HttpParams | Record<string, string | number | boolean>;
  headers?: HttpHeaders | Record<string, string>;
  context?: HttpContext;
  observe?: 'body';
  responseType?: 'json';
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;

  public get<T>(url: string, options?: Omit<HttpOptions, 'body'>) {
    return this.http.get<T>(`${this.baseUrl}${url}`, { ...options, withCredentials: true });
  }

  public post<T, TBody = unknown>(url: string, body: TBody, options?: HttpOptions<TBody>) {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, { ...options, withCredentials: true });
  }

  public put<T, TBody = unknown>(url: string, body: TBody, options?: HttpOptions<TBody>) {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, { ...options, withCredentials: true });
  }

  public delete<T>(url: string, options?: Omit<HttpOptions, 'body'>) {
    return this.http.delete<T>(`${this.baseUrl}${url}`, { ...options, withCredentials: true });
  }
}
