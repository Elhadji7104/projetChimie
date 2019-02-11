import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocalisation } from 'app/shared/model/localisation.model';
import { AccountService } from 'app/core';
import { LocalisationService } from './localisation.service';

@Component({
    selector: 'jhi-localisation',
    templateUrl: './localisation.component.html'
})
export class LocalisationComponent implements OnInit, OnDestroy {
    localisations: ILocalisation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected localisationService: LocalisationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.localisationService.query().subscribe(
            (res: HttpResponse<ILocalisation[]>) => {
                this.localisations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLocalisations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILocalisation) {
        return item.id;
    }

    registerChangeInLocalisations() {
        this.eventSubscriber = this.eventManager.subscribe('localisationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
