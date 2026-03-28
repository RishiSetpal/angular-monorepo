import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  const method = req.method;
  const url = req.url;

  console.log(`[API] ${method} ${url} - Request started`);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const duration = Date.now() - startTime;
        const status = event.status;
        console.log(`[API] ${method} ${url} - Response ${status} (${duration}ms)`);
      }
    })
  );
};
