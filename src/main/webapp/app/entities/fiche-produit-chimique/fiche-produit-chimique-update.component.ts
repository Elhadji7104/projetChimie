import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { FicheProduitChimiqueService } from './fiche-produit-chimique.service';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';

@Component({
    selector: 'jhi-fiche-produit-chimique-update',
    templateUrl: './fiche-produit-chimique-update.component.html'
})
export class FicheProduitChimiqueUpdateComponent implements OnInit {
    ficheProduitChimique: IFicheProduitChimique;
    isSaving: boolean;

    fichearticles: IFicheArticle[];

    val1: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheProduitChimique }) => {
            this.ficheProduitChimique = ficheProduitChimique;
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
        if (this.ficheProduitChimique.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheProduitChimiqueService.update(this.ficheProduitChimique));
        } else {
            this.subscribeToSaveResponse(this.ficheProduitChimiqueService.create(this.ficheProduitChimique));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFicheProduitChimique>>) {
        result.subscribe(
            (res: HttpResponse<IFicheProduitChimique>) => this.onSaveSuccess(),
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
