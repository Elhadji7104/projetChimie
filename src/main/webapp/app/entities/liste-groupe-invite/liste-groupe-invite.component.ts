import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';
import { AccountService } from 'app/core';
import { ListeGroupeInviteService } from './liste-groupe-invite.service';

@Component({
    selector: 'jhi-liste-groupe-invite',
    templateUrl: './liste-groupe-invite.component.html'
})
export class ListeGroupeInviteComponent implements OnInit, OnDestroy {
    listeGroupeInvites: IListeGroupeInvite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected listeGroupeInviteService: ListeGroupeInviteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.listeGroupeInviteService.query().subscribe(
            (res: HttpResponse<IListeGroupeInvite[]>) => {
                this.listeGroupeInvites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInListeGroupeInvites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IListeGroupeInvite) {
        return item.id;
    }

    registerChangeInListeGroupeInvites() {
        this.eventSubscriber = this.eventManager.subscribe('listeGroupeInviteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
