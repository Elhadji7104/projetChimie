import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';
import { FicheEmpruntProduitService } from './fiche-emprunt-produit.service';
import { FicheEmpruntProduitComponent } from './fiche-emprunt-produit.component';
import { FicheEmpruntProduitDetailComponent } from './fiche-emprunt-produit-detail.component';
import { FicheEmpruntProduitUpdateComponent } from './fiche-emprunt-produit-update.component';
import { FicheEmpruntProduitDeletePopupComponent } from './fiche-emprunt-produit-delete-dialog.component';
import { IFicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';

@Injectable({ providedIn: 'root' })
export class FicheEmpruntProduitResolve implements Resolve<IFicheEmpruntProduit> {
    constructor(private service: FicheEmpruntProduitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FicheEmpruntProduit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FicheEmpruntProduit>) => response.ok),
                map((ficheEmpruntProduit: HttpResponse<FicheEmpruntProduit>) => ficheEmpruntProduit.body)
            );
        }
        return of(new FicheEmpruntProduit());
    }
}

export const ficheEmpruntProduitRoute: Routes = [
    {
        path: 'fiche-emprunt-produit',
        component: FicheEmpruntProduitComponent,
        data: {
            authorities: [
                'ROLE_USER',
                'ROLE_VALIDEUR',
                'ROLE_VALIDEUR',
                'ROLE_HYGIENE_ET_SECURITE',
                'ROLE_GESTIONNAIRE_DE_BASE',
                'ROLE_GESTIONNAIRE_DE_BASE'
            ],
            pageTitle: 'projetChimieApp.ficheEmpruntProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-emprunt-produit/:id/view',
        component: FicheEmpruntProduitDetailComponent,
        resolve: {
            ficheEmpruntProduit: FicheEmpruntProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheEmpruntProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-emprunt-produit/new',
        component: FicheEmpruntProduitUpdateComponent,
        resolve: {
            ficheEmpruntProduit: FicheEmpruntProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheEmpruntProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-emprunt-produit/:id/edit',
        component: FicheEmpruntProduitUpdateComponent,
        resolve: {
            ficheEmpruntProduit: FicheEmpruntProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheEmpruntProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheEmpruntProduitPopupRoute: Routes = [
    {
        path: 'fiche-emprunt-produit/:id/delete',
        component: FicheEmpruntProduitDeletePopupComponent,
        resolve: {
            ficheEmpruntProduit: FicheEmpruntProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.ficheEmpruntProduit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
