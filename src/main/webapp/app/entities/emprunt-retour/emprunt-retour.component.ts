import { MenuItem } from 'primeng/api';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FicheArticle, IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from '../fiche-article';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { FicheEmpruntProduitService } from '../fiche-emprunt-produit';
import { FicheEmpruntProduit, IFicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';
import moment = require('moment');
import { FicheRetourProduit, IFicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';
import { FicheRetourProduitService } from '../fiche-retour-produit';
import { SelectItem } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService, IUser, User } from 'app/core';

@Component({
    selector: 'jhi-emprunt-retour',
    templateUrl: './emprunt-retour.component.html',
    styles: []
})
export class EmpruntRetourComponent implements OnInit {
    @ViewChild('menuItems') menu: MenuItem[];
    private activeItem: any;
    private currentAccount: any;
    eventSubscriber: Subscription;
    ficheArticles: IFicheArticle[];
    private account: any;
    ficheArticle: IFicheArticle = new FicheArticle();
    ficheEmpruntProduit: IFicheEmpruntProduit = new FicheEmpruntProduit();
    empruntRetour: MenuItem[];
    choix = true;
    produitChoix: any;
    quantite: any;
    private user: IUser = new User();
    private ficheRetourProduit: IFicheRetourProduit = new FicheRetourProduit();
    articleOption: SelectItem[] = [];
    unite: String = 'Article non choisi';

    constructor(
        protected ficheArticleService: FicheArticleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected ficheEmpruntProduitService: FicheEmpruntProduitService,
        protected ficheRetourProduitService: FicheRetourProduitService
    ) {}

    loadAll() {
        this.ficheArticleService.query().subscribe(
            (res: HttpResponse<IFicheArticle[]>) => {
                this.ficheArticles = res.body;
                for (let value of this.ficheArticles) {
                    if (value !== undefined && value.refArticle !== undefined) {
                        this.articleOption.push({
                            label:
                                value.refArticle + ' : ' + value.ficheProduitChimiques[0].cas + ' : ' + value.ficheProduitChimiques[0].nom,
                            value: value
                        });
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.account = account;
        });
        this.loadAll();
        this.empruntRetour = [
            {
                label: 'Emprunt',
                icon: 'fa fa-fw fa-bar-chart',
                command: event => {
                    this.choix = false;
                }
            },
            {
                label: 'Retour',
                icon: 'fa fa-fw fa-calendar',
                command: event => {
                    this.choix = true;
                }
            }
        ];

        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheArticles();
        //console.log(this.ficheArticles);
    }

    registerChangeInFicheArticles() {
        this.eventSubscriber = this.eventManager.subscribe('ficheArticleListModification', response => this.loadAll());
    }

    onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    save() {
        /*this.ficheArticleService.find(1).subscribe(result => {
            this.ficheArticle = result.body;
        });*/
        if (this.choix) {
            this.ficheEmpruntProduit.ficheArticle = this.ficheArticle;
            this.user = this.currentAccount;
            this.ficheEmpruntProduit.demandeur = this.user;
            console.log(this.ficheEmpruntProduit.demandeur);
            this.ficheEmpruntProduit.dateEmprunt = moment(new Date(Date.now()));
            this.ficheEmpruntProduit.quantite = this.quantite;
            this.ficheEmpruntProduitService.create(this.ficheEmpruntProduit).subscribe(result => {
                console.log(result);
            });
        } else {
            this.ficheRetourProduit.ficheArticle = this.ficheArticle;
            this.user = this.currentAccount;
            this.ficheRetourProduit.demandeur = this.user;
            console.log(this.ficheRetourProduit.demandeur);
            this.ficheRetourProduit.dateRetour = moment(new Date(Date.now()));
            this.ficheRetourProduit.quantite = this.quantite;
            this.ficheRetourProduitService.create(this.ficheRetourProduit).subscribe(result => {
                console.log(result);
            });
        }
    }

    actuUnite() {
        if (this.ficheArticle.unites.length !== 0) {
            this.unite = this.ficheArticle.unites[0].libelleUnite;
        }
    }
}
