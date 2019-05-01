import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';
import { TypeLieuStockageService } from './type-lieu-stockage.service';
import { TypeLieuStockageComponent } from './type-lieu-stockage.component';
import { TypeLieuStockageDetailComponent } from './type-lieu-stockage-detail.component';
import { TypeLieuStockageUpdateComponent } from './type-lieu-stockage-update.component';
import { TypeLieuStockageDeletePopupComponent } from './type-lieu-stockage-delete-dialog.component';
import { ITypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';

@Injectable({ providedIn: 'root' })
export class TypeLieuStockageResolve implements Resolve<ITypeLieuStockage> {
    constructor(private service: TypeLieuStockageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TypeLieuStockage> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TypeLieuStockage>) => response.ok),
                map((typeLieuStockage: HttpResponse<TypeLieuStockage>) => typeLieuStockage.body)
            );
        }
        return of(new TypeLieuStockage());
    }
}

export const typeLieuStockageRoute: Routes = [
    {
        path: 'type-lieu-stockage',
        component: TypeLieuStockageComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeLieuStockage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-lieu-stockage/:id/view',
        component: TypeLieuStockageDetailComponent,
        resolve: {
            typeLieuStockage: TypeLieuStockageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeLieuStockage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-lieu-stockage/new',
        component: TypeLieuStockageUpdateComponent,
        resolve: {
            typeLieuStockage: TypeLieuStockageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeLieuStockage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-lieu-stockage/:id/edit',
        component: TypeLieuStockageUpdateComponent,
        resolve: {
            typeLieuStockage: TypeLieuStockageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeLieuStockage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeLieuStockagePopupRoute: Routes = [
    {
        path: 'type-lieu-stockage/:id/delete',
        component: TypeLieuStockageDeletePopupComponent,
        resolve: {
            typeLieuStockage: TypeLieuStockageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeLieuStockage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
