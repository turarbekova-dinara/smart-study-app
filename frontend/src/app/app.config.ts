import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {AppComponent} from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';



export const appConfig: ApplicationConfig = {
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
