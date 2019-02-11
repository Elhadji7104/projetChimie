import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';
import { AccountService } from 'app/core';
import { MailGestionnaireService } from './mail-gestionnaire.service';

@Component({
    selector: 'jhi-mail-gestionnaire',
    templateUrl: './mail-gestionnaire.component.html'
})
export class MailGestionnaireComponent implements OnInit, OnDestroy {
    mailGestionnaires: IMailGestionnaire[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected mailGestionnaireService: MailGestionnaireService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.mailGestionnaireService.query().subscribe(
            (res: HttpResponse<IMailGestionnaire[]>) => {
                this.mailGestionnaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMailGestionnaires();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMailGestionnaire) {
        return item.id;
    }

    registerChangeInMailGestionnaires() {
        this.eventSubscriber = this.eventManager.subscribe('mailGestionnaireListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
