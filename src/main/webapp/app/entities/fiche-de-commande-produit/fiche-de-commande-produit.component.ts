import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { FicheDeCommandeProduit, IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';
import { AccountService } from 'app/core';
import { FicheDeCommandeProduitService } from './fiche-de-commande-produit.service';
import { FicheArticleService } from 'app/entities/fiche-article';
import { DisponibliteArticle, FicheArticle, IFicheArticle } from 'app/shared/model/fiche-article.model';
import moment = require('moment');

@Component({
    selector: 'jhi-fiche-de-commande-produit',
    templateUrl: './fiche-de-commande-produit.component.html'
})
export class FicheDeCommandeProduitComponent implements OnInit, OnDestroy {
    ficheDeCommandeProduits: IFicheDeCommandeProduit[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private ficheArticle: IFicheArticle = new FicheArticle();
    private ficheDeCommandeProduit: IFicheDeCommandeProduit = new FicheDeCommandeProduit();

    constructor(
        protected ficheDeCommandeProduitService: FicheDeCommandeProduitService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected ficheArticleService: FicheArticleService
    ) {}

    loadAll() {
        this.ficheDeCommandeProduitService.query().subscribe(
            (res: HttpResponse<IFicheDeCommandeProduit[]>) => {
                this.ficheDeCommandeProduits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheDeCommandeProduits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFicheDeCommandeProduit) {
        return item.id;
    }

    registerChangeInFicheDeCommandeProduits() {
        this.eventSubscriber = this.eventManager.subscribe('ficheDeCommandeProduitListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    livraison(id) {
        this.ficheDeCommandeProduitService.find(id).subscribe(fiche => (this.ficheDeCommandeProduit = fiche.body));

        this.ficheArticle = this.ficheDeCommandeProduit.ficheArticle;
        this.ficheDeCommandeProduit.dateLivraison = moment(new Date(Date.now()));
        this.ficheDeCommandeProduitService.update(this.ficheDeCommandeProduit);
        console.log(this.ficheDeCommandeProduit);
        //this.ficheArticle.disponibliteArticle = DisponibliteArticle.DISPONIBLE;
        //this.ficheArticleService.update(this.ficheArticle)
    }
}
