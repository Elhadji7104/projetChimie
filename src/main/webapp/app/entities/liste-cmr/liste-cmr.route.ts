import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListeCmr } from 'app/shared/model/liste-cmr.model';
import { ListeCmrService } from './liste-cmr.service';
import { ListeCmrComponent } from './liste-cmr.component';
import { ListeCmrDetailComponent } from './liste-cmr-detail.component';
import { ListeCmrUpdateComponent } from './liste-cmr-update.component';
import { ListeCmrDeletePopupComponent } from './liste-cmr-delete-dialog.component';
import { IListeCmr } from 'app/shared/model/liste-cmr.model';

@Injectable({ providedIn: 'root' })
export class ListeCmrResolve implements Resolve<IListeCmr> {
    constructor(private service: ListeCmrService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListeCmr> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ListeCmr>) => response.ok),
                map((listeCmr: HttpResponse<ListeCmr>) => listeCmr.body)
            );
        }
        return of(new ListeCmr());
    }
}

export const listeCmrRoute: Routes = [
    {
        path: 'liste-cmr',
        component: ListeCmrComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeCmr.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-cmr/:id/view',
        component: ListeCmrDetailComponent,
        resolve: {
            listeCmr: ListeCmrResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeCmr.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-cmr/new',
        component: ListeCmrUpdateComponent,
        resolve: {
            listeCmr: ListeCmrResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeCmr.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-cmr/:id/edit',
        component: ListeCmrUpdateComponent,
        resolve: {
            listeCmr: ListeCmrResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeCmr.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const listeCmrPopupRoute: Routes = [
    {
        path: 'liste-cmr/:id/delete',
        component: ListeCmrDeletePopupComponent,
        resolve: {
            listeCmr: ListeCmrResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeCmr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
