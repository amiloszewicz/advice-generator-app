import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'generator',
    loadComponent: () =>
      import('./generator/generator.component').then(
        (c) => c.GeneratorComponent
      ),
  },
  {
    path: '',
    redirectTo: 'generator',
    pathMatch: 'full',
  },
];
