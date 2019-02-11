import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';
import { AccountService } from 'app/core';
import { FicheDeCommandeProduitService } from './fiche-de-commande-produit.service';

@Component({
    selector: 'jhi-fiche-de-commande-produit',
    templateUrl: './fiche-de-commande-produit.component.html'
})
export class FicheDeCommandeProduitComponent implements OnInit, OnDestroy {
    ficheDeCommandeProduits: IFicheDeCommandeProduit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ficheDeCommandeProduitService: FicheDeCommandeProduitService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ficheDeCommandeProduitService.query().subscribe(
            (res: HttpResponse<IFicheDeCommandeProduit[]>) => {
                this.ficheDeCommandeProduits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheDeCommandeProduits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFicheDeCommandeProduit) {
        return item.id;
    }

    registerChangeInFicheDeCommandeProduits() {
        this.eventSubscriber = this.eventManager.subscribe('ficheDeCommandeProduitListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
