import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Classification } from 'app/shared/model/classification.model';
import { ListeLocalisationService } from './liste-localisation.service';
import { ListeLocalisationComponent } from './liste-localisation.component';
import { IClassification } from 'app/shared/model/classification.model';

@Injectable({ providedIn: 'root' })
export class ClassificationResolve implements Resolve<IClassification> {
    constructor(private service: ListeLocalisationService) {}

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

export const listeLocalisationRoute: Routes = [
    {
        path: 'liste-localisation',
        component: ListeLocalisationComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
            pageTitle: 'projetChimieApp.classification.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
