import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';
import { FicheRetourProduitService } from './fiche-retour-produit.service';
import { FicheRetourProduitComponent } from './fiche-retour-produit.component';
import { FicheRetourProduitDetailComponent } from './fiche-retour-produit-detail.component';
import { FicheRetourProduitUpdateComponent } from './fiche-retour-produit-update.component';
import { FicheRetourProduitDeletePopupComponent } from './fiche-retour-produit-delete-dialog.component';
import { IFicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';

@Injectable({ providedIn: 'root' })
export class FicheRetourProduitResolve implements Resolve<IFicheRetourProduit> {
    constructor(private service: FicheRetourProduitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FicheRetourProduit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FicheRetourProduit>) => response.ok),
                map((ficheRetourProduit: HttpResponse<FicheRetourProduit>) => ficheRetourProduit.body)
            );
        }
        return of(new FicheRetourProduit());
    }
}

export const ficheRetourProduitRoute: Routes = [
    {
        path: 'fiche-retour-produit',
        component: FicheRetourProduitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheRetourProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-retour-produit/:id/view',
        component: FicheRetourProduitDetailComponent,
        resolve: {
            ficheRetourProduit: FicheRetourProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheRetourProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-retour-produit/new',
        component: FicheRetourProduitUpdateComponent,
        resolve: {
            ficheRetourProduit: FicheRetourProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheRetourProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-retour-produit/:id/edit',
        component: FicheRetourProduitUpdateComponent,
        resolve: {
            ficheRetourProduit: FicheRetourProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheRetourProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheRetourProduitPopupRoute: Routes = [
    {
        path: 'fiche-retour-produit/:id/delete',
        component: FicheRetourProduitDeletePopupComponent,
        resolve: {
            ficheRetourProduit: FicheRetourProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheRetourProduit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
