import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';
import { FicheRetourProduitService } from './fiche-retour-produit.service';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';
import { Account, AccountService } from 'app/core';

@Component({
    selector: 'jhi-fiche-retour-produit-update',
    templateUrl: './fiche-retour-produit-update.component.html'
})
export class FicheRetourProduitUpdateComponent implements OnInit {
    ficheRetourProduit: IFicheRetourProduit;
    isSaving: boolean;
    account: Account;

    fichearticles: IFicheArticle[];

    constructor(
        private accountService: AccountService,
        protected jhiAlertService: JhiAlertService,
        protected ficheRetourProduitService: FicheRetourProduitService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheRetourProduit }) => {
            this.ficheRetourProduit = ficheRetourProduit;
        });
        this.ficheArticleService.query().subscribe(
            (res: HttpResponse<IFicheArticle[]>) => {
                this.fichearticles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.accountService.identity().then(account => {
            this.account = account;
        });
        const dateString = Date.now();
        const dateObj = new Date(dateString);
        const momentObj = moment(dateObj);
        this.ficheRetourProduit.dateRetour = momentObj;
        this.ficheRetourProduit.user = this.account;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ficheRetourProduit.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheRetourProduitService.update(this.ficheRetourProduit));
        } else {
            this.subscribeToSaveResponse(this.ficheRetourProduitService.create(this.ficheRetourProduit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFicheRetourProduit>>) {
        result.subscribe((res: HttpResponse<IFicheRetourProduit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFicheArticleById(index: number, item: IFicheArticle) {
        return item.id;
    }
}
