import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClassification } from 'app/shared/model/classification.model';
import { AccountService } from 'app/core';
import { ListeLocalisationService } from './liste-localisation.service';
import { FicheEmpruntProduitUpdateComponent } from 'app/entities/fiche-emprunt-produit';
import { FicheRetourProduitUpdateComponent } from 'app/entities/fiche-retour-produit';

@Component({
    selector: 'jhi-liste-localisation',
    templateUrl: './emprunt-retour.component.html'
})
export class EmpruntRetourComponent implements OnInit, OnDestroy {
    classifications: IClassification[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected classificationService: ListeLocalisationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.classificationService.query().subscribe(
            (res: HttpResponse<IClassification[]>) => {
                this.classifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClassifications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClassification) {
        return item.id;
    }

    registerChangeInClassifications() {
        this.eventSubscriber = this.eventManager.subscribe('classificationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
