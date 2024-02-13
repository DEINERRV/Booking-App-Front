import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'lodgings',
        loadChildren: () => import('./modules/lodging/lodging.routes').then(m => m.LODGING_ROUTES)
    },
    {
        path: '',
        loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
    },
];
