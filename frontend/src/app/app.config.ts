import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';



export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const token = localStorage.getItem('token');

          if (token) {
            const cloned = req.clone({
              setHeaders: {
                Authorization: `Token ${token}`
              }
            });
            return next(cloned);
          }

          return next(req);
        }
      ])
    )
  ]
};
