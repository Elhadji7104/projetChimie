import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUnite } from 'app/shared/model/unite.model';
import { AccountService } from 'app/core';
import { UniteService } from './unite.service';

@Component({
    selector: 'jhi-unite',
    templateUrl: './unite.component.html'
})
export class UniteComponent implements OnInit, OnDestroy {
    unites: IUnite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected uniteService: UniteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.uniteService.query().subscribe(
            (res: HttpResponse<IUnite[]>) => {
                this.unites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUnites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUnite) {
        return item.id;
    }

    registerChangeInUnites() {
        this.eventSubscriber = this.eventManager.subscribe('uniteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
