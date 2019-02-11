import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { AccountService } from 'app/core';
import { FicheArticleService } from './fiche-article.service';

@Component({
    selector: 'jhi-fiche-article',
    templateUrl: './fiche-article.component.html'
})
export class FicheArticleComponent implements OnInit, OnDestroy {
    ficheArticles: IFicheArticle[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ficheArticleService: FicheArticleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ficheArticleService.query().subscribe(
            (res: HttpResponse<IFicheArticle[]>) => {
                this.ficheArticles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheArticles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFicheArticle) {
        return item.id;
    }

    registerChangeInFicheArticles() {
        this.eventSubscriber = this.eventManager.subscribe('ficheArticleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
