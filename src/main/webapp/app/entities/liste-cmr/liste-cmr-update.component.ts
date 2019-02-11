import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IListeCmr } from 'app/shared/model/liste-cmr.model';
import { ListeCmrService } from './liste-cmr.service';
import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { FicheProduitChimiqueService } from 'app/entities/fiche-produit-chimique';

@Component({
    selector: 'jhi-liste-cmr-update',
    templateUrl: './liste-cmr-update.component.html'
})
export class ListeCmrUpdateComponent implements OnInit {
    listeCmr: IListeCmr;
    isSaving: boolean;

    ficheproduitchimiques: IFicheProduitChimique[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected listeCmrService: ListeCmrService,
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ listeCmr }) => {
            this.listeCmr = listeCmr;
        });
        this.ficheProduitChimiqueService.query().subscribe(
            (res: HttpResponse<IFicheProduitChimique[]>) => {
                this.ficheproduitchimiques = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.listeCmr.id !== undefined) {
            this.subscribeToSaveResponse(this.listeCmrService.update(this.listeCmr));
        } else {
            this.subscribeToSaveResponse(this.listeCmrService.create(this.listeCmr));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IListeCmr>>) {
        result.subscribe((res: HttpResponse<IListeCmr>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFicheProduitChimiqueById(index: number, item: IFicheProduitChimique) {
        return item.id;
    }
}
