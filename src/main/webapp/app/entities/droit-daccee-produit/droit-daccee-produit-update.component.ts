import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { DroitDacceeProduitService } from './droit-daccee-produit.service';
import { IGroupe } from 'app/shared/model/groupe.model';
import { GroupeService } from 'app/entities/groupe';
import { FicheArticleService } from 'app/entities/fiche-article';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';

@Component({
    selector: 'jhi-droit-daccee-produit-update',
    templateUrl: './droit-daccee-produit-update.component.html'
})
export class DroitDacceeProduitUpdateComponent implements OnInit {
    droitDacceeProduit: IDroitDacceeProduit;
    isSaving: boolean;

    groupes: IGroupe[];
    articles: IFicheArticle[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected droitDacceeProduitService: DroitDacceeProduitService,
        protected groupeService: GroupeService,
        protected activatedRoute: ActivatedRoute,
        protected articleService: FicheArticleService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ droitDacceeProduit }) => {
            this.droitDacceeProduit = droitDacceeProduit;
        });
        this.groupeService.query().subscribe(
            (res: HttpResponse<IGroupe[]>) => {
                this.groupes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.articleService.query().subscribe(
            (res: HttpResponse<IFicheArticle[]>) => {
                this.articles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.droitDacceeProduit.id !== undefined) {
            this.subscribeToSaveResponse(this.droitDacceeProduitService.update(this.droitDacceeProduit));
        } else {
            this.subscribeToSaveResponse(this.droitDacceeProduitService.create(this.droitDacceeProduit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDroitDacceeProduit>>) {
        result.subscribe((res: HttpResponse<IDroitDacceeProduit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackArticleById(index: number, item: IFicheArticle) {
        return item.id;
    }

    trackGroupeById(index: number, item: IGroupe) {
        return item.id;
    }
}
