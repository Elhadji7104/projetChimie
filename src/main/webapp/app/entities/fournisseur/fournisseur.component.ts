import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { AccountService } from 'app/core';
import { FournisseurService } from './fournisseur.service';

@Component({
    selector: 'jhi-fournisseur',
    templateUrl: './fournisseur.component.html'
})
export class FournisseurComponent implements OnInit, OnDestroy {
    fournisseurs: IFournisseur[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected fournisseurService: FournisseurService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.fournisseurService.query().subscribe(
            (res: HttpResponse<IFournisseur[]>) => {
                this.fournisseurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFournisseurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFournisseur) {
        return item.id;
    }

    registerChangeInFournisseurs() {
        this.eventSubscriber = this.eventManager.subscribe('fournisseurListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
