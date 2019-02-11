import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListeMotsCles } from 'app/shared/model/liste-mots-cles.model';
import { AccountService } from 'app/core';
import { ListeMotsClesService } from './liste-mots-cles.service';

@Component({
    selector: 'jhi-liste-mots-cles',
    templateUrl: './liste-mots-cles.component.html'
})
export class ListeMotsClesComponent implements OnInit, OnDestroy {
    listeMotsCles: IListeMotsCles[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected listeMotsClesService: ListeMotsClesService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.listeMotsClesService.query().subscribe(
            (res: HttpResponse<IListeMotsCles[]>) => {
                this.listeMotsCles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInListeMotsCles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IListeMotsCles) {
        return item.id;
    }

    registerChangeInListeMotsCles() {
        this.eventSubscriber = this.eventManager.subscribe('listeMotsClesListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
