import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('login') && !req.url.includes('signup')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer Token`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
