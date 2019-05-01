import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { FicheProduitChimiqueService } from './fiche-produit-chimique.service';
import { FicheProduitChimiqueComponent } from './fiche-produit-chimique.component';
import { FicheProduitChimiqueDetailComponent } from './fiche-produit-chimique-detail.component';
import { FicheProduitChimiqueUpdateComponent } from './fiche-produit-chimique-update.component';
import { FicheProduitChimiqueDeletePopupComponent } from './fiche-produit-chimique-delete-dialog.component';
import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { FicheProduitChimiquePrintPopupComponent } from 'app/entities/fiche-produit-chimique/fiche-produit-chimique-print-dialog.component';

@Injectable({ providedIn: 'root' })
export class FicheProduitChimiqueResolve implements Resolve<IFicheProduitChimique> {
    constructor(private service: FicheProduitChimiqueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FicheProduitChimique> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FicheProduitChimique>) => response.ok),
                map((ficheProduitChimique: HttpResponse<FicheProduitChimique>) => ficheProduitChimique.body)
            );
        }
        return of(new FicheProduitChimique());
    }
}

export const ficheProduitChimiqueRoute: Routes = [
    {
        path: 'fiche-produit-chimique',
        component: FicheProduitChimiqueComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.ficheProduitChimique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-produit-chimique/:id/view',
        component: FicheProduitChimiqueDetailComponent,
        resolve: {
            ficheProduitChimique: FicheProduitChimiqueResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.ficheProduitChimique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-produit-chimique/new',
        component: FicheProduitChimiqueUpdateComponent,
        resolve: {
            ficheProduitChimique: FicheProduitChimiqueResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.ficheProduitChimique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-produit-chimique/:id/edit',
        component: FicheProduitChimiqueUpdateComponent,
        resolve: {
            ficheProduitChimique: FicheProduitChimiqueResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.ficheProduitChimique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-produit-chimique/print',
        component: FicheProduitChimiquePrintPopupComponent,
        resolve: {
            ficheProduitChimique: FicheProduitChimiqueResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.ficheProduitChimique.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

export const ficheProduitChimiquePopupRoute: Routes = [
    {
        path: 'fiche-produit-chimique/:id/delete',
        component: FicheProduitChimiqueDeletePopupComponent,
        resolve: {
            ficheProduitChimique: FicheProduitChimiqueResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.ficheProduitChimique.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
