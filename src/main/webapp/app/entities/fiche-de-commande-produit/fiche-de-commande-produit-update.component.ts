import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';
import { FicheDeCommandeProduitService } from './fiche-de-commande-produit.service';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';

@Component({
    selector: 'jhi-fiche-de-commande-produit-update',
    templateUrl: './fiche-de-commande-produit-update.component.html'
})
export class FicheDeCommandeProduitUpdateComponent implements OnInit {
    ficheDeCommandeProduit: IFicheDeCommandeProduit;
    isSaving: boolean;

    fournisseurs: IFournisseur[];

    fichearticles: IFicheArticle[];
    dateDeCommandeDp: any;
    dateLivraisonDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ficheDeCommandeProduitService: FicheDeCommandeProduitService,
        protected fournisseurService: FournisseurService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheDeCommandeProduit }) => {
            this.ficheDeCommandeProduit = ficheDeCommandeProduit;
        });
        this.fournisseurService.query().subscribe(
            (res: HttpResponse<IFournisseur[]>) => {
                this.fournisseurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.ficheDeCommandeProduit.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheDeCommandeProduitService.update(this.ficheDeCommandeProduit));
        } else {
            this.subscribeToSaveResponse(this.ficheDeCommandeProduitService.create(this.ficheDeCommandeProduit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFicheDeCommandeProduit>>) {
        result.subscribe(
            (res: HttpResponse<IFicheDeCommandeProduit>) => this.onSaveSuccess(),
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

    trackFournisseurById(index: number, item: IFournisseur) {
        return item.id;
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
