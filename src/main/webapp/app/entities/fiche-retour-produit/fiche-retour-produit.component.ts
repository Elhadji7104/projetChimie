import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';
import { AccountService } from 'app/core';
import { FicheRetourProduitService } from './fiche-retour-produit.service';

@Component({
    selector: 'jhi-fiche-retour-produit',
    templateUrl: './fiche-retour-produit.component.html'
})
export class FicheRetourProduitComponent implements OnInit, OnDestroy {
    ficheRetourProduits: IFicheRetourProduit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ficheRetourProduitService: FicheRetourProduitService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ficheRetourProduitService.query().subscribe(
            (res: HttpResponse<IFicheRetourProduit[]>) => {
                this.ficheRetourProduits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheRetourProduits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFicheRetourProduit) {
        return item.id;
    }

    registerChangeInFicheRetourProduits() {
        this.eventSubscriber = this.eventManager.subscribe('ficheRetourProduitListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
