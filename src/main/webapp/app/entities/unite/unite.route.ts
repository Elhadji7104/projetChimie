import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Unite } from 'app/shared/model/unite.model';
import { UniteService } from './unite.service';
import { UniteComponent } from './unite.component';
import { UniteDetailComponent } from './unite-detail.component';
import { UniteUpdateComponent } from './unite-update.component';
import { UniteDeletePopupComponent } from './unite-delete-dialog.component';
import { IUnite } from 'app/shared/model/unite.model';

@Injectable({ providedIn: 'root' })
export class UniteResolve implements Resolve<IUnite> {
    constructor(private service: UniteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Unite> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Unite>) => response.ok),
                map((unite: HttpResponse<Unite>) => unite.body)
            );
        }
        return of(new Unite());
    }
}

export const uniteRoute: Routes = [
    {
        path: 'unite',
        component: UniteComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.unite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'unite/:id/view',
        component: UniteDetailComponent,
        resolve: {
            unite: UniteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.unite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'unite/new',
        component: UniteUpdateComponent,
        resolve: {
            unite: UniteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.unite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'unite/:id/edit',
        component: UniteUpdateComponent,
        resolve: {
            unite: UniteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.unite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const unitePopupRoute: Routes = [
    {
        path: 'unite/:id/delete',
        component: UniteDeletePopupComponent,
        resolve: {
            unite: UniteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.unite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
