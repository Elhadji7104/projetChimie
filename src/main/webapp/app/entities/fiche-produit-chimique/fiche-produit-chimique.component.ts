import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { AccountService } from 'app/core';
import { FicheProduitChimiqueService } from './fiche-produit-chimique.service';

@Component({
    selector: 'jhi-fiche-produit-chimique',
    templateUrl: './fiche-produit-chimique.component.html'
})
export class FicheProduitChimiqueComponent implements OnInit, OnDestroy {
    ficheProduitChimiques: IFicheProduitChimique[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ficheProduitChimiqueService.query().subscribe(
            (res: HttpResponse<IFicheProduitChimique[]>) => {
                this.ficheProduitChimiques = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheProduitChimiques();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFicheProduitChimique) {
        return item.id;
    }

    registerChangeInFicheProduitChimiques() {
        this.eventSubscriber = this.eventManager.subscribe('ficheProduitChimiqueListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
