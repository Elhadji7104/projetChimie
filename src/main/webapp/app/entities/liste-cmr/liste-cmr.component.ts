import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListeCmr } from 'app/shared/model/liste-cmr.model';
import { AccountService } from 'app/core';
import { ListeCmrService } from './liste-cmr.service';

@Component({
    selector: 'jhi-liste-cmr',
    templateUrl: './liste-cmr.component.html'
})
export class ListeCmrComponent implements OnInit, OnDestroy {
    listeCmrs: IListeCmr[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected listeCmrService: ListeCmrService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.listeCmrService.query().subscribe(
            (res: HttpResponse<IListeCmr[]>) => {
                this.listeCmrs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInListeCmrs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IListeCmr) {
        return item.id;
    }

    registerChangeInListeCmrs() {
        this.eventSubscriber = this.eventManager.subscribe('listeCmrListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
