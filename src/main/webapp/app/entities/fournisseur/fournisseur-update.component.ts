import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from './fournisseur.service';
import { IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';
import { FicheDeCommandeProduitService } from 'app/entities/fiche-de-commande-produit';

@Component({
    selector: 'jhi-fournisseur-update',
    templateUrl: './fournisseur-update.component.html'
})
export class FournisseurUpdateComponent implements OnInit {
    fournisseur: IFournisseur;
    isSaving: boolean;

    fichedecommandeproduits: IFicheDeCommandeProduit[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected fournisseurService: FournisseurService,
        protected ficheDeCommandeProduitService: FicheDeCommandeProduitService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fournisseur }) => {
            this.fournisseur = fournisseur;
        });
        this.ficheDeCommandeProduitService.query().subscribe(
            (res: HttpResponse<IFicheDeCommandeProduit[]>) => {
                this.fichedecommandeproduits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fournisseur.id !== undefined) {
            this.subscribeToSaveResponse(this.fournisseurService.update(this.fournisseur));
        } else {
            this.subscribeToSaveResponse(this.fournisseurService.create(this.fournisseur));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFournisseur>>) {
        result.subscribe((res: HttpResponse<IFournisseur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFicheDeCommandeProduitById(index: number, item: IFicheDeCommandeProduit) {
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
