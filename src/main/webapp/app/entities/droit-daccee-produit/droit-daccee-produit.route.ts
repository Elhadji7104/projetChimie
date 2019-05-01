import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { DroitDacceeProduitService } from './droit-daccee-produit.service';
import { DroitDacceeProduitComponent } from './droit-daccee-produit.component';
import { DroitDacceeProduitDetailComponent } from './droit-daccee-produit-detail.component';
import { DroitDacceeProduitUpdateComponent } from './droit-daccee-produit-update.component';
import { DroitDacceeProduitDeletePopupComponent } from './droit-daccee-produit-delete-dialog.component';
import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';

@Injectable({ providedIn: 'root' })
export class DroitDacceeProduitResolve implements Resolve<IDroitDacceeProduit> {
    constructor(private service: DroitDacceeProduitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DroitDacceeProduit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DroitDacceeProduit>) => response.ok),
                map((droitDacceeProduit: HttpResponse<DroitDacceeProduit>) => droitDacceeProduit.body)
            );
        }
        return of(new DroitDacceeProduit());
    }
}

export const droitDacceeProduitRoute: Routes = [
    {
        path: 'droit-daccee-produit',
        component: DroitDacceeProduitComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.droitDacceeProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'droit-daccee-produit/:id/view',
        component: DroitDacceeProduitDetailComponent,
        resolve: {
            droitDacceeProduit: DroitDacceeProduitResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.droitDacceeProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
    /*  {
        path: 'droit-daccee-produit/new',
        component: DroitDacceeProduitUpdateComponent,
        resolve: {
            droitDacceeProduit: DroitDacceeProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.droitDacceeProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'droit-daccee-produit/:id/edit',
        component: DroitDacceeProduitUpdateComponent,
        resolve: {
            droitDacceeProduit: DroitDacceeProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.droitDacceeProduit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }*/
];

export const droitDacceeProduitPopupRoute: Routes = [
    {
        path: 'droit-daccee-produit/:id/delete',
        component: DroitDacceeProduitDeletePopupComponent,
        resolve: {
            droitDacceeProduit: DroitDacceeProduitResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.droitDacceeProduit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
