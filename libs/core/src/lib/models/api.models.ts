export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  statusCode: number;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  responseType?: 'json' | 'blob' | 'text';
}

export interface Environment {
  production: boolean;
  apiUrl: string;
  appVersion: string;
}
