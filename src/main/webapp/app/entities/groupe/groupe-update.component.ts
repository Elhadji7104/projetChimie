import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGroupe } from 'app/shared/model/groupe.model';
import { GroupeService } from './groupe.service';
import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { DroitDacceeProduitService } from 'app/entities/droit-daccee-produit';

@Component({
    selector: 'jhi-groupe-update',
    templateUrl: './groupe-update.component.html'
})
export class GroupeUpdateComponent implements OnInit {
    groupe: IGroupe;
    isSaving: boolean;

    droitdacceeproduits: IDroitDacceeProduit[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected groupeService: GroupeService,
        protected droitDacceeProduitService: DroitDacceeProduitService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ groupe }) => {
            this.groupe = groupe;
        });
        this.droitDacceeProduitService.query().subscribe(
            (res: HttpResponse<IDroitDacceeProduit[]>) => {
                this.droitdacceeproduits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.groupe.id !== undefined) {
            this.subscribeToSaveResponse(this.groupeService.update(this.groupe));
        } else {
            this.subscribeToSaveResponse(this.groupeService.create(this.groupe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupe>>) {
        result.subscribe((res: HttpResponse<IGroupe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDroitDacceeProduitById(index: number, item: IDroitDacceeProduit) {
        return item.id;
    }
}
