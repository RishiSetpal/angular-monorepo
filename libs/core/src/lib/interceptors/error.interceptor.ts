import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ErrorResponse } from '../models/api.models';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorResponse: ErrorResponse;

      if (error.error instanceof ErrorEvent) {
        errorResponse = {
          message: error.error.message || 'Network error occurred',
          statusCode: 0,
        };
      } else {
        errorResponse = {
          message: error.error?.message || 'An error occurred',
          code: error.error?.code,
          statusCode: error.status,
          errors: error.error?.errors,
        };
      }

      notificationService.showError(errorResponse.message);
      console.error('HTTP Error:', error);

      return throwError(() => errorResponse);
    })
  );
};
