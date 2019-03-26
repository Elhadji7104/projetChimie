import { Route } from '@angular/router';

import { HomeComponent } from './';
import { EmpruntRetourComponent } from '../entities/emprunt-retour/emprunt-retour.component';
import { UserRouteAccessService } from 'app/core';
import { RechercheComponent } from 'app/recherche/recherche.component';
import { FicheArticleResolve } from 'app/entities/fiche-article';
import { ProcessusComponent } from 'app/processus/processus.component';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};

export const EMPRUNTPRODUIT: Route = {
    path: 'emprunt-produit',
    component: EmpruntRetourComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};

export const RECHERCHE: Route = {
    path: 'recherche',
    component: RechercheComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};
export const EMPRUNTPRODUITID: Route = {
    path: 'emprunt-produit/:id/edit',
    component: EmpruntRetourComponent,
    resolve: {
        ficheArticle: FicheArticleResolve
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};
export const PROCESSUS: Route = {
    path: 'processus-metier',
    component: ProcessusComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};
