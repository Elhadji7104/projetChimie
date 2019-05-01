import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Classification } from 'app/shared/model/classification.model';
import { ClassificationService } from './classification.service';
import { ClassificationComponent } from './classification.component';
import { ClassificationDetailComponent } from './classification-detail.component';
import { ClassificationUpdateComponent } from './classification-update.component';
import { ClassificationDeletePopupComponent } from './classification-delete-dialog.component';
import { IClassification } from 'app/shared/model/classification.model';

@Injectable({ providedIn: 'root' })
export class ClassificationResolve implements Resolve<IClassification> {
    constructor(private service: ClassificationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Classification> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Classification>) => response.ok),
                map((classification: HttpResponse<Classification>) => classification.body)
            );
        }
        return of(new Classification());
    }
}

export const classificationRoute: Routes = [
    {
        path: 'classification',
        component: ClassificationComponent,
        data: {
            authorities: ['ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],

            pageTitle: 'projetChimieApp.classification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classification/:id/view',
        component: ClassificationDetailComponent,
        resolve: {
            classification: ClassificationResolve
        },
        data: {
            authorities: ['ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],

            pageTitle: 'projetChimieApp.classification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classification/new',
        component: ClassificationUpdateComponent,
        resolve: {
            classification: ClassificationResolve
        },
        data: {
            authorities: ['ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],

            pageTitle: 'projetChimieApp.classification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classification/:id/edit',
        component: ClassificationUpdateComponent,
        resolve: {
            classification: ClassificationResolve
        },
        data: {
            authorities: ['ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],

            pageTitle: 'projetChimieApp.classification.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classificationPopupRoute: Routes = [
    {
        path: 'classification/:id/delete',
        component: ClassificationDeletePopupComponent,
        resolve: {
            classification: ClassificationResolve
        },
        data: {
            authorities: ['ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],

            pageTitle: 'projetChimieApp.classification.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
