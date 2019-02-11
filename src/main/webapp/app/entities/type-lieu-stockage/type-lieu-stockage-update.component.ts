import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';
import { TypeLieuStockageService } from './type-lieu-stockage.service';
import { ILocalisation } from 'app/shared/model/localisation.model';
import { LocalisationService } from 'app/entities/localisation';

@Component({
    selector: 'jhi-type-lieu-stockage-update',
    templateUrl: './type-lieu-stockage-update.component.html'
})
export class TypeLieuStockageUpdateComponent implements OnInit {
    typeLieuStockage: ITypeLieuStockage;
    isSaving: boolean;

    localisations: ILocalisation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected typeLieuStockageService: TypeLieuStockageService,
        protected localisationService: LocalisationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ typeLieuStockage }) => {
            this.typeLieuStockage = typeLieuStockage;
        });
        this.localisationService.query().subscribe(
            (res: HttpResponse<ILocalisation[]>) => {
                this.localisations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.typeLieuStockage.id !== undefined) {
            this.subscribeToSaveResponse(this.typeLieuStockageService.update(this.typeLieuStockage));
        } else {
            this.subscribeToSaveResponse(this.typeLieuStockageService.create(this.typeLieuStockage));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeLieuStockage>>) {
        result.subscribe((res: HttpResponse<ITypeLieuStockage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLocalisationById(index: number, item: ILocalisation) {
        return item.id;
    }
}
