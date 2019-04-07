import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';
import { FicheEmpruntProduitService } from './fiche-emprunt-produit.service';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';
import { Account, AccountService } from 'app/core';

@Component({
    selector: 'jhi-fiche-emprunt-produit-update',
    templateUrl: './fiche-emprunt-produit-update.component.html'
})
export class FicheEmpruntProduitUpdateComponent implements OnInit {
    ficheEmpruntProduit: IFicheEmpruntProduit;
    isSaving: boolean;
    account: Account;

    fichearticles: IFicheArticle[];

    constructor(
        private accountService: AccountService,
        protected jhiAlertService: JhiAlertService,
        protected ficheEmpruntProduitService: FicheEmpruntProduitService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheEmpruntProduit }) => {
            this.ficheEmpruntProduit = ficheEmpruntProduit;
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
        /* const dateString = Date.now();
        const dateObj = new Date(dateString);
        const momentObj = moment(dateObj);
        this.ficheEmpruntProduit.dateEmprunt = momentObj;
        this.ficheEmpruntProduit.user = this.account;*/
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ficheEmpruntProduit.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheEmpruntProduitService.update(this.ficheEmpruntProduit));
        } else {
            this.subscribeToSaveResponse(this.ficheEmpruntProduitService.create(this.ficheEmpruntProduit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFicheEmpruntProduit>>) {
        result.subscribe((res: HttpResponse<IFicheEmpruntProduit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
