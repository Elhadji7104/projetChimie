import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';
import { ListeGroupeInviteService } from './liste-groupe-invite.service';
import { ListeGroupeInviteComponent } from './liste-groupe-invite.component';
import { ListeGroupeInviteDetailComponent } from './liste-groupe-invite-detail.component';
import { ListeGroupeInviteUpdateComponent } from './liste-groupe-invite-update.component';
import { ListeGroupeInviteDeletePopupComponent } from './liste-groupe-invite-delete-dialog.component';
import { IListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';

@Injectable({ providedIn: 'root' })
export class ListeGroupeInviteResolve implements Resolve<IListeGroupeInvite> {
    constructor(private service: ListeGroupeInviteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListeGroupeInvite> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ListeGroupeInvite>) => response.ok),
                map((listeGroupeInvite: HttpResponse<ListeGroupeInvite>) => listeGroupeInvite.body)
            );
        }
        return of(new ListeGroupeInvite());
    }
}

export const listeGroupeInviteRoute: Routes = [
    {
        path: 'liste-groupe-invite',
        component: ListeGroupeInviteComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.listeGroupeInvite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-groupe-invite/:id/view',
        component: ListeGroupeInviteDetailComponent,
        resolve: {
            listeGroupeInvite: ListeGroupeInviteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.listeGroupeInvite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-groupe-invite/new',
        component: ListeGroupeInviteUpdateComponent,
        resolve: {
            listeGroupeInvite: ListeGroupeInviteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.listeGroupeInvite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'liste-groupe-invite/:id/edit',
        component: ListeGroupeInviteUpdateComponent,
        resolve: {
            listeGroupeInvite: ListeGroupeInviteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.listeGroupeInvite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const listeGroupeInvitePopupRoute: Routes = [
    {
        path: 'liste-groupe-invite/:id/delete',
        component: ListeGroupeInviteDeletePopupComponent,
        resolve: {
            listeGroupeInvite: ListeGroupeInviteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.listeGroupeInvite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
