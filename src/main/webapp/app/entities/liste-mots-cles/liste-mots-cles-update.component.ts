import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IListeMotsCles } from 'app/shared/model/liste-mots-cles.model';
import { ListeMotsClesService } from './liste-mots-cles.service';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';

@Component({
    selector: 'jhi-liste-mots-cles-update',
    templateUrl: './liste-mots-cles-update.component.html'
})
export class ListeMotsClesUpdateComponent implements OnInit {
    listeMotsCles: IListeMotsCles;
    isSaving: boolean;

    fichearticles: IFicheArticle[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected listeMotsClesService: ListeMotsClesService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ listeMotsCles }) => {
            this.listeMotsCles = listeMotsCles;
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
        if (this.listeMotsCles.id !== undefined) {
            this.subscribeToSaveResponse(this.listeMotsClesService.update(this.listeMotsCles));
        } else {
            this.subscribeToSaveResponse(this.listeMotsClesService.create(this.listeMotsCles));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IListeMotsCles>>) {
        result.subscribe((res: HttpResponse<IListeMotsCles>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
