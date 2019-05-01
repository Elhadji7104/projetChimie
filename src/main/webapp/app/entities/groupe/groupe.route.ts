import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Groupe } from 'app/shared/model/groupe.model';
import { GroupeService } from './groupe.service';
import { GroupeComponent } from './groupe.component';
import { GroupeDetailComponent } from './groupe-detail.component';
import { GroupeUpdateComponent } from './groupe-update.component';
import { GroupeDeletePopupComponent } from './groupe-delete-dialog.component';
import { IGroupe } from 'app/shared/model/groupe.model';

@Injectable({ providedIn: 'root' })
export class GroupeResolve implements Resolve<IGroupe> {
    constructor(private service: GroupeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Groupe> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Groupe>) => response.ok),
                map((groupe: HttpResponse<Groupe>) => groupe.body)
            );
        }
        return of(new Groupe());
    }
}

export const groupeRoute: Routes = [
    {
        path: 'groupe',
        component: GroupeComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.groupe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'groupe/:id/view',
        component: GroupeDetailComponent,
        resolve: {
            groupe: GroupeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.groupe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'groupe/new',
        component: GroupeUpdateComponent,
        resolve: {
            groupe: GroupeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.groupe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'groupe/:id/edit',
        component: GroupeUpdateComponent,
        resolve: {
            groupe: GroupeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.groupe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const groupePopupRoute: Routes = [
    {
        path: 'groupe/:id/delete',
        component: GroupeDeletePopupComponent,
        resolve: {
            groupe: GroupeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.groupe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
