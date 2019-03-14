import { Route } from '@angular/router';

import { HomeComponent } from './';
import { EmpruntRetour2Component } from '../emprunt-retour2/emprunt-retour2.component';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};

export const EMPRUNTPRODUIT2: Route = {
    path: 'emprunt-produit',
    component: EmpruntRetour2Component,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
