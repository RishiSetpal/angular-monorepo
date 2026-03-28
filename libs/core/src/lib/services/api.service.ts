import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  ApiRequestOptions,
  PaginationParams,
  PaginatedResponse,
  Environment,
} from '../models/api.models';

const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appVersion: '1.0.0',
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = signal(environment.apiUrl);

  setBaseUrl(url: string): void {
    this.baseUrl.set(url);
  }

  get<T>(endpoint: string, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    const params = this.buildParams(options?.params);
    return this.http.get<ApiResponse<T>>(`${this.baseUrl()}${endpoint}`, {
      headers: options?.headers,
      params,
    });
  }

  post<T>(
    endpoint: string,
    body: any,
    options?: ApiRequestOptions
  ): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl()}${endpoint}`, body, {
      headers: options?.headers,
      params: this.buildParams(options?.params),
    });
  }

  put<T>(
    endpoint: string,
    body: any,
    options?: ApiRequestOptions
  ): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl()}${endpoint}`, body, {
      headers: options?.headers,
      params: this.buildParams(options?.params),
    });
  }

  patch<T>(
    endpoint: string,
    body: any,
    options?: ApiRequestOptions
  ): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(`${this.baseUrl()}${endpoint}`, body, {
      headers: options?.headers,
      params: this.buildParams(options?.params),
    });
  }

  delete<T>(endpoint: string, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl()}${endpoint}`, {
      headers: options?.headers,
      params: this.buildParams(options?.params),
    });
  }

  getPaginated<T>(
    endpoint: string,
    pagination: PaginationParams,
    options?: ApiRequestOptions
  ): Observable<PaginatedResponse<T>> {
    const params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', pagination.sortBy || '')
      .set('sortOrder', pagination.sortOrder || 'asc');

    return this.http.get<PaginatedResponse<T>>(`${this.baseUrl()}${endpoint}`, {
      headers: options?.headers,
      params: this.mergeParams(params, options?.params),
    });
  }

  downloadFile(endpoint: string, filename: string, options?: ApiRequestOptions): void {
    const params = this.buildParams(options?.params);
    this.http
      .get(`${this.baseUrl()}${endpoint}`, {
        headers: options?.headers,
        params,
        responseType: 'blob',
      })
      .subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return httpParams;
  }

  private mergeParams(params1: HttpParams, params2?: Record<string, any>): HttpParams {
    let merged = params1;
    if (params2) {
      Object.keys(params2).forEach((key) => {
        const value = params2[key];
        if (value !== null && value !== undefined) {
          merged = merged.set(key, value.toString());
        }
      });
    }
    return merged;
  }
}
