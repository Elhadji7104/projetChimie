import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';
import { AccountService } from 'app/core';
import { TypeLieuStockageService } from './type-lieu-stockage.service';

@Component({
    selector: 'jhi-type-lieu-stockage',
    templateUrl: './type-lieu-stockage.component.html'
})
export class TypeLieuStockageComponent implements OnInit, OnDestroy {
    typeLieuStockages: ITypeLieuStockage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected typeLieuStockageService: TypeLieuStockageService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.typeLieuStockageService.query().subscribe(
            (res: HttpResponse<ITypeLieuStockage[]>) => {
                this.typeLieuStockages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTypeLieuStockages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITypeLieuStockage) {
        return item.id;
    }

    registerChangeInTypeLieuStockages() {
        this.eventSubscriber = this.eventManager.subscribe('typeLieuStockageListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
