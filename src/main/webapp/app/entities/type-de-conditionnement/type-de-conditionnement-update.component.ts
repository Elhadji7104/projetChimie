import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';
import { TypeDeConditionnementService } from './type-de-conditionnement.service';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';

@Component({
    selector: 'jhi-type-de-conditionnement-update',
    templateUrl: './type-de-conditionnement-update.component.html'
})
export class TypeDeConditionnementUpdateComponent implements OnInit {
    typeDeConditionnement: ITypeDeConditionnement;
    isSaving: boolean;

    fichearticles: IFicheArticle[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected typeDeConditionnementService: TypeDeConditionnementService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ typeDeConditionnement }) => {
            this.typeDeConditionnement = typeDeConditionnement;
        });
        this.ficheArticleService.query().subscribe(
            (res: HttpResponse<IFicheArticle[]>) => {
                this.fichearticles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.typeDeConditionnement.id !== undefined) {
            this.subscribeToSaveResponse(this.typeDeConditionnementService.update(this.typeDeConditionnement));
        } else {
            this.subscribeToSaveResponse(this.typeDeConditionnementService.create(this.typeDeConditionnement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeDeConditionnement>>) {
        result.subscribe(
            (res: HttpResponse<ITypeDeConditionnement>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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
