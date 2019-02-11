import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILocalisation } from 'app/shared/model/localisation.model';
import { LocalisationService } from './localisation.service';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';

@Component({
    selector: 'jhi-localisation-update',
    templateUrl: './localisation-update.component.html'
})
export class LocalisationUpdateComponent implements OnInit {
    localisation: ILocalisation;
    isSaving: boolean;

    fichearticles: IFicheArticle[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected localisationService: LocalisationService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ localisation }) => {
            this.localisation = localisation;
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
        if (this.localisation.id !== undefined) {
            this.subscribeToSaveResponse(this.localisationService.update(this.localisation));
        } else {
            this.subscribeToSaveResponse(this.localisationService.create(this.localisation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalisation>>) {
        result.subscribe((res: HttpResponse<ILocalisation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
