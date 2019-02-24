import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Sort } from '@angular/material';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { AccountService } from 'app/core';
import { FicheArticleService } from './fiche-article.service';
import { SortEvent } from 'primeng/api';

interface User {
    id;
    name;
    email;
}

@Component({
    selector: 'jhi-fiche-article',
    templateUrl: './fiche-article.component.html'
})
export class FicheArticleComponent implements OnInit, OnDestroy {
    users: User[];
    cols: any[];
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
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'refArticle', header: 'refArticle' },
            { field: 'etatPhysique', header: 'etatPhysique' },
            { field: 'codeInterne', header: 'codeInterne' },
            { field: 'codeBarre', header: 'codeBarre' },
            { field: 'disponibliteArticle', header: 'disponibliteArticle' },
            { field: 'typeDesuivi', header: 'typeDesuivi' },
            { field: 'accessibilite', header: 'accessibilite' },
            { field: 'document', header: 'document' },
            { field: 'unite', header: 'unite' },
            { field: 'ficheProduitChimique', header: 'ficheProduitChimique' },
            { field: 'classification', header: 'classification' },
            { field: 'droitDacceeProduit', header: 'droitDacceeProduit' }
        ];
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

    /*  methodThatOrdersTBodyRows(sort1: Sort) {
      this.ficheArticles.sort((a: IFicheArticle, b: IFicheArticle) => {
          if ((a.codeBarre || '').toLowerCase() < (b.codeBarre  || '').toLowerCase()) {
              console.log('a.refArticle-1', a.codeBarre);
              console.log('b.refArticle-1', b.codeBarre);
              return -1;
          } else if ((a.codeBarre || '').toLowerCase() > (b.codeBarre || '').toLowerCase()) {
              console.log('a.refArticle1', a.codeBarre);
              console.log('b.refArticle1', b.codeBarre);
              return 1;
          } else {
              console.log('a.refArticle0', a.codeBarre);
              console.log('b.refArticle0', b.codeBarre);
              return 0;
          }
      });
  }*/
    sortData(sort: Sort) {
        console.log(sort);
        if (!sort.active || sort.direction === '') {
            this.ficheArticles = this.ficheArticles;
            return;
        }

        this.ficheArticles = this.ficheArticles.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            console.log(sort.active);
            switch (sort.active) {
                case 'id':
                    return compare(a.id, b.id, isAsc);
                default:
                    return 0;
            }
        });
    }
}
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
