import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'homepage',
    loadChildren: () =>
      import('./features/homepage/homepage.routes').then(
        (m) => m.homepageRoutes
      ),
  },
];
