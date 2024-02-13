import { Route } from '@angular/router';
import { ListComponent } from './list/list.component';
import { InfoComponent } from './info/info.component';

export const LODGING_ROUTES: Route[] = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: '{id}',
        component: InfoComponent
    },
];