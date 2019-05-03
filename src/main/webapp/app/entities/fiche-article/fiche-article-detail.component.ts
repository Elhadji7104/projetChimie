import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { AccountService } from 'app/core';
import { DroitDacceeProduitService } from '../droit-daccee-produit';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-fiche-article-detail',
    templateUrl: './fiche-article-detail.component.html'
})
export class FicheArticleDetailComponent implements OnInit {
    ficheArticle: IFicheArticle;
    droitDacceeProduits: IDroitDacceeProduit[] = [];
    constructor(
        protected jhiAlertService: JhiAlertService,
        protected droitDacceeProduitService: DroitDacceeProduitService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheArticle }) => {
            this.ficheArticle = ficheArticle;
        });
        this.droitDacceeProduitService.query().subscribe(
            (res: HttpResponse<IDroitDacceeProduit[]>) => {
                this.droitDacceeProduits = res.body.filter(droit => droit.ficheArticle.codeBarre === this.ficheArticle.codeBarre);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        console.log(this.ficheArticle);
    }

    previousState() {
        window.history.back();
    }
    gotoLien(lien: string) {
        window.location.href = lien;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
