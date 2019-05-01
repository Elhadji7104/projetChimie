import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';
import { TypeDeConditionnementService } from './type-de-conditionnement.service';
import { TypeDeConditionnementComponent } from './type-de-conditionnement.component';
import { TypeDeConditionnementDetailComponent } from './type-de-conditionnement-detail.component';
import { TypeDeConditionnementUpdateComponent } from './type-de-conditionnement-update.component';
import { TypeDeConditionnementDeletePopupComponent } from './type-de-conditionnement-delete-dialog.component';
import { ITypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';

@Injectable({ providedIn: 'root' })
export class TypeDeConditionnementResolve implements Resolve<ITypeDeConditionnement> {
    constructor(private service: TypeDeConditionnementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TypeDeConditionnement> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TypeDeConditionnement>) => response.ok),
                map((typeDeConditionnement: HttpResponse<TypeDeConditionnement>) => typeDeConditionnement.body)
            );
        }
        return of(new TypeDeConditionnement());
    }
}

export const typeDeConditionnementRoute: Routes = [
    {
        path: 'type-de-conditionnement',
        component: TypeDeConditionnementComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeDeConditionnement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-de-conditionnement/:id/view',
        component: TypeDeConditionnementDetailComponent,
        resolve: {
            typeDeConditionnement: TypeDeConditionnementResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeDeConditionnement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-de-conditionnement/new',
        component: TypeDeConditionnementUpdateComponent,
        resolve: {
            typeDeConditionnement: TypeDeConditionnementResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeDeConditionnement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-de-conditionnement/:id/edit',
        component: TypeDeConditionnementUpdateComponent,
        resolve: {
            typeDeConditionnement: TypeDeConditionnementResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeDeConditionnement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeDeConditionnementPopupRoute: Routes = [
    {
        path: 'type-de-conditionnement/:id/delete',
        component: TypeDeConditionnementDeletePopupComponent,
        resolve: {
            typeDeConditionnement: TypeDeConditionnementResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.typeDeConditionnement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
