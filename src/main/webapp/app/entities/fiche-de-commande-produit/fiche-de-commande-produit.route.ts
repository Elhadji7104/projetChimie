import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';
import { FicheDeCommandeProduitService } from './fiche-de-commande-produit.service';
import { FicheDeCommandeProduitComponent } from './fiche-de-commande-produit.component';
import { FicheDeCommandeProduitDetailComponent } from './fiche-de-commande-produit-detail.component';
import { FicheDeCommandeProduitUpdateComponent } from './fiche-de-commande-produit-update.component';
import { FicheDeCommandeProduitDeletePopupComponent } from './fiche-de-commande-produit-delete-dialog.component';
import { IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';

@Injectable({ providedIn: 'root' })
export class FicheDeCommandeProduitResolve implements Resolve<IFicheDeCommandeProduit> {
    constructor(private service: FicheDeCommandeProduitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FicheDeCommandeProduit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FicheDeCommandeProduit>) => response.ok),
                map((ficheDeCommandeProduit: HttpResponse<FicheDeCommandeProduit>) => ficheDeCommandeProduit.body)
            );
        }
        return of(new FicheDeCommandeProduit());
    }
}

export const ficheDeCommandeProduitRoute: Routes = [
    {
        path: 'fiche-de-commande-produit',
        component: FicheDeCommandeProduitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheDeCommandeProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-de-commande-produit/:id/view',
        component: FicheDeCommandeProduitDetailComponent,
        resolve: {
            ficheDeCommandeProduit: FicheDeCommandeProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheDeCommandeProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-de-commande-produit/new',
        component: FicheDeCommandeProduitUpdateComponent,
        resolve: {
            ficheDeCommandeProduit: FicheDeCommandeProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheDeCommandeProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-de-commande-produit/:id/edit',
        component: FicheDeCommandeProduitUpdateComponent,
        resolve: {
            ficheDeCommandeProduit: FicheDeCommandeProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheDeCommandeProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheDeCommandeProduitPopupRoute: Routes = [
    {
        path: 'fiche-de-commande-produit/:id/delete',
        component: FicheDeCommandeProduitDeletePopupComponent,
        resolve: {
            ficheDeCommandeProduit: FicheDeCommandeProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheDeCommandeProduit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
