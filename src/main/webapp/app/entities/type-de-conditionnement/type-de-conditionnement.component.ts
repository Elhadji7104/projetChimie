import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';
import { AccountService } from 'app/core';
import { TypeDeConditionnementService } from './type-de-conditionnement.service';

@Component({
    selector: 'jhi-type-de-conditionnement',
    templateUrl: './type-de-conditionnement.component.html'
})
export class TypeDeConditionnementComponent implements OnInit, OnDestroy {
    typeDeConditionnements: ITypeDeConditionnement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected typeDeConditionnementService: TypeDeConditionnementService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.typeDeConditionnementService.query().subscribe(
            (res: HttpResponse<ITypeDeConditionnement[]>) => {
                this.typeDeConditionnements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTypeDeConditionnements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITypeDeConditionnement) {
        return item.id;
    }

    registerChangeInTypeDeConditionnements() {
        this.eventSubscriber = this.eventManager.subscribe('typeDeConditionnementListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
