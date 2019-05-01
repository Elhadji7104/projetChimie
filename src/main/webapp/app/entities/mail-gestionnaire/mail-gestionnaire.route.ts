import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';
import { MailGestionnaireService } from './mail-gestionnaire.service';
import { MailGestionnaireComponent } from './mail-gestionnaire.component';
import { MailGestionnaireDetailComponent } from './mail-gestionnaire-detail.component';
import { MailGestionnaireUpdateComponent } from './mail-gestionnaire-update.component';
import { MailGestionnaireDeletePopupComponent } from './mail-gestionnaire-delete-dialog.component';
import { IMailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';

@Injectable({ providedIn: 'root' })
export class MailGestionnaireResolve implements Resolve<IMailGestionnaire> {
    constructor(private service: MailGestionnaireService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MailGestionnaire> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MailGestionnaire>) => response.ok),
                map((mailGestionnaire: HttpResponse<MailGestionnaire>) => mailGestionnaire.body)
            );
        }
        return of(new MailGestionnaire());
    }
}

export const mailGestionnaireRoute: Routes = [
    {
        path: 'mail-gestionnaire',
        component: MailGestionnaireComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.mailGestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mail-gestionnaire/:id/view',
        component: MailGestionnaireDetailComponent,
        resolve: {
            mailGestionnaire: MailGestionnaireResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.mailGestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mail-gestionnaire/new',
        component: MailGestionnaireUpdateComponent,
        resolve: {
            mailGestionnaire: MailGestionnaireResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.mailGestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mail-gestionnaire/:id/edit',
        component: MailGestionnaireUpdateComponent,
        resolve: {
            mailGestionnaire: MailGestionnaireResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.mailGestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mailGestionnairePopupRoute: Routes = [
    {
        path: 'mail-gestionnaire/:id/delete',
        component: MailGestionnaireDeletePopupComponent,
        resolve: {
            mailGestionnaire: MailGestionnaireResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.mailGestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
