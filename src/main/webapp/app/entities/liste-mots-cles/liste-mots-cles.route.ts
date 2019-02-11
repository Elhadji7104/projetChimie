import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListeMotsCles } from 'app/shared/model/liste-mots-cles.model';
import { ListeMotsClesService } from './liste-mots-cles.service';
import { ListeMotsClesComponent } from './liste-mots-cles.component';
import { ListeMotsClesDetailComponent } from './liste-mots-cles-detail.component';
import { ListeMotsClesUpdateComponent } from './liste-mots-cles-update.component';
import { ListeMotsClesDeletePopupComponent } from './liste-mots-cles-delete-dialog.component';
import { IListeMotsCles } from 'app/shared/model/liste-mots-cles.model';

@Injectable({ providedIn: 'root' })
export class ListeMotsClesResolve implements Resolve<IListeMotsCles> {
    constructor(private service: ListeMotsClesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListeMotsCles> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ListeMotsCles>) => response.ok),
                map((listeMotsCles: HttpResponse<ListeMotsCles>) => listeMotsCles.body)
            );
        }
        return of(new ListeMotsCles());
    }
}

export const listeMotsClesRoute: Routes = [
    {
        path: 'liste-mots-cles',
        component: ListeMotsClesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeMotsCles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-mots-cles/:id/view',
        component: ListeMotsClesDetailComponent,
        resolve: {
            listeMotsCles: ListeMotsClesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeMotsCles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-mots-cles/new',
        component: ListeMotsClesUpdateComponent,
        resolve: {
            listeMotsCles: ListeMotsClesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeMotsCles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-mots-cles/:id/edit',
        component: ListeMotsClesUpdateComponent,
        resolve: {
            listeMotsCles: ListeMotsClesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeMotsCles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const listeMotsClesPopupRoute: Routes = [
    {
        path: 'liste-mots-cles/:id/delete',
        component: ListeMotsClesDeletePopupComponent,
        resolve: {
            listeMotsCles: ListeMotsClesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetChimieApp.listeMotsCles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
