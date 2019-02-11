import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { AccountService } from 'app/core';
import { DroitDacceeProduitService } from './droit-daccee-produit.service';

@Component({
    selector: 'jhi-droit-daccee-produit',
    templateUrl: './droit-daccee-produit.component.html'
})
export class DroitDacceeProduitComponent implements OnInit, OnDestroy {
    droitDacceeProduits: IDroitDacceeProduit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected droitDacceeProduitService: DroitDacceeProduitService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.droitDacceeProduitService.query().subscribe(
            (res: HttpResponse<IDroitDacceeProduit[]>) => {
                this.droitDacceeProduits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDroitDacceeProduits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDroitDacceeProduit) {
        return item.id;
    }

    registerChangeInDroitDacceeProduits() {
        this.eventSubscriber = this.eventManager.subscribe('droitDacceeProduitListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
