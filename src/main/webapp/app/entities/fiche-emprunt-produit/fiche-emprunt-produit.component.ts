import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';
import {Account, AccountService} from 'app/core';
import { FicheEmpruntProduitService } from './fiche-emprunt-produit.service';

@Component({
    selector: 'jhi-fiche-emprunt-produit',
    templateUrl: './fiche-emprunt-produit.component.html'
})
export class FicheEmpruntProduitComponent implements OnInit, OnDestroy {
    account: Account;
    ficheEmpruntProduits: IFicheEmpruntProduit[];
    eventSubscriber: Subscription;
    currentAccount :any;
    constructor(
        protected ficheEmpruntProduitService: FicheEmpruntProduitService,
        private accountService: AccountService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
    ) {}

    loadAll() {
        this.ficheEmpruntProduitService.query().subscribe(
            (res: HttpResponse<IFicheEmpruntProduit[]>) => {
                this.ficheEmpruntProduits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.account = account;
        });
        this.registerChangeInFicheEmpruntProduits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFicheEmpruntProduit) {
        return item.id;
    }

    registerChangeInFicheEmpruntProduits() {
        this.eventSubscriber = this.eventManager.subscribe('ficheEmpruntProduitListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
