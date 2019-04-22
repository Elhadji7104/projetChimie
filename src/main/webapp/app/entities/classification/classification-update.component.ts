import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IClassification } from 'app/shared/model/classification.model';
import { ClassificationService } from './classification.service';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';
import { IUser, User } from 'app/core';
import { IGroupe } from 'app/shared/model/groupe.model';
import { GroupeService } from 'app/entities/groupe';

@Component({
    selector: 'jhi-classification-update',
    templateUrl: './classification-update.component.html'
})
export class ClassificationUpdateComponent implements OnInit {
    classification: IClassification;
    isSaving: boolean;
    private user: IUser = new User();
    fichearticles: IFicheArticle[];
    private curentGroupe;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected classificationService: ClassificationService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute,
        protected groupeService: GroupeService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.groupeService.getCurrentGroup().subscribe(data => {
            this.curentGroupe = data;

            console.log('datagropue', this.curentGroupe.id);
            console.log('datagroupe', this.curentGroupe.body.nomGroupe);
        });
        this.activatedRoute.data.subscribe(({ classification }) => {
            this.classification = classification;
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
        this.classification.groupe = this.curentGroupe;
        if (this.classification.id !== undefined) {
            this.subscribeToSaveResponse(this.classificationService.update(this.classification));
        } else {
            this.subscribeToSaveResponse(this.classificationService.create(this.classification));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IClassification>>) {
        result.subscribe((res: HttpResponse<IClassification>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
