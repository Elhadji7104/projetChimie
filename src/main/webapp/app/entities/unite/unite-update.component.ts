import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUnite } from 'app/shared/model/unite.model';
import { UniteService } from './unite.service';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';

@Component({
    selector: 'jhi-unite-update',
    templateUrl: './unite-update.component.html'
})
export class UniteUpdateComponent implements OnInit {
    unite: IUnite;
    isSaving: boolean;

    fichearticles: IFicheArticle[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected uniteService: UniteService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ unite }) => {
            this.unite = unite;
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
        if (this.unite.id !== undefined) {
            this.subscribeToSaveResponse(this.uniteService.update(this.unite));
        } else {
            this.subscribeToSaveResponse(this.uniteService.create(this.unite));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnite>>) {
        result.subscribe((res: HttpResponse<IUnite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
