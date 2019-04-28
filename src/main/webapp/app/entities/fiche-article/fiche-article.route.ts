import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from './fiche-article.service';
import { FicheArticleDetailComponent } from './fiche-article-detail.component';
import { FicheArticleUpdateComponent } from './fiche-article-update.component';
import { FicheArticleDeletePopupComponent } from './fiche-article-delete-dialog.component';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';

@Injectable({ providedIn: 'root' })
export class FicheArticleResolve implements Resolve<IFicheArticle> {
    constructor(private service: FicheArticleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FicheArticle> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FicheArticle>) => response.ok),
                map((ficheArticle: HttpResponse<FicheArticle>) => ficheArticle.body)
            );
        }
        return of(new FicheArticle());
    }
}

export const ficheArticleRoute: Routes = [
    {
        path: 'fiche-article/:id/view',
        component: FicheArticleDetailComponent,
        resolve: {
            ficheArticle: FicheArticleResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_VALIDEUR', 'ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.ficheArticle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-article/new',
        component: FicheArticleUpdateComponent,
        resolve: {
            ficheArticle: FicheArticleResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_VALIDEUR', 'ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.ficheArticle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiche-article/:id/edit',
        component: FicheArticleUpdateComponent,
        resolve: {
            ficheArticle: FicheArticleResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_VALIDEUR', 'ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.ficheArticle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheArticlePopupRoute: Routes = [
    {
        path: 'fiche-article/:id/delete',
        component: FicheArticleDeletePopupComponent,
        resolve: {
            ficheArticle: FicheArticleResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_VALIDEUR', 'ROLE_HYGIENE_ET_SECURITE', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_ADMIN'],
            pageTitle: 'projetChimieApp.ficheArticle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
