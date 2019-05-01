import { Route } from '@angular/router';

import { HomeComponent } from './';
import { EmpruntRetourComponent } from '../entities/emprunt-retour/emprunt-retour.component';
import { UserRouteAccessService } from 'app/core';
import { RechercheComponent } from 'app/recherche/recherche.component';
import { FicheArticleDetailComponent, FicheArticleResolve } from 'app/entities/fiche-article';
import { ProcessusComponent } from 'app/processus/processus.component';
import { ProcessusDetailComponent } from 'app/processus/processus-detail/processus-detail.component';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
        pageTitle: 'home.title'
    }
};

export const EMPRUNTPRODUIT: Route = {
    path: 'emprunt-produit',
    component: EmpruntRetourComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};

export const RECHERCHE: Route = {
    path: 'recherche',
    component: RechercheComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
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
        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};
export const PROCESSUS: Route = {
    path: 'processus-metier',
    component: ProcessusComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};

export const PROCESSUSDETAIL: Route = {
    path: 'processus-metier/:refArticle/view',
    component: ProcessusDetailComponent,
    resolve: {
        ficheArticle: FicheArticleResolve
    },
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
        pageTitle: 'projetChimieApp.ficheArticle.home.title'
    },
    canActivate: [UserRouteAccessService]
};
