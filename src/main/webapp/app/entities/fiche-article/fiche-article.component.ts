import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Sort } from '@angular/material';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { AccountService, User } from 'app/core';
import { FicheArticleService } from './fiche-article.service';
import { SelectItem, SortEvent } from 'primeng/api';
import { ClassificationService } from 'app/entities/classification';
import { IClassification } from 'app/shared/model/classification.model';

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
    classifi: IClassification[];

    refArticleO: SelectItem[];
    casO: SelectItem[];
    acronymeO: SelectItem[];
    quantiteO: SelectItem[];
    disponibliteArticleO: SelectItem[];
    nomO: SelectItem[];
    classificationO: SelectItem[];
    localisationO: SelectItem[];

    constructor(
        protected classificationService: ClassificationService,
        protected ficheArticleService: FicheArticleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}
    loadAll() {
        this.ficheArticleService.query().subscribe(
            (res: HttpResponse<IFicheArticle[]>) => {
                this.ficheArticles = res.body;
                console.log(res.body);

                this.refArticleO = [];
                this.casO = [];
                this.acronymeO = [];
                this.quantiteO = [];
                this.disponibliteArticleO = [];
                this.nomO = [];

                for (let value of this.ficheArticles) {
                    if (value !== undefined) {
                        if (
                            value.refArticle !== undefined &&
                            this.refArticleO.indexOf({
                                label: value.refArticle,
                                value: value.refArticle
                            }) === -1
                        ) {
                            this.refArticleO.push({ label: value.refArticle, value: value.refArticle });
                        }

                        if (
                            value.ficheProduitChimiques[0].cas !== undefined &&
                            this.casO.indexOf({
                                label: value.ficheProduitChimiques[0].cas,
                                value: value.ficheProduitChimiques[0].cas
                            }) === -1
                        ) {
                            this.casO.push({ label: value.ficheProduitChimiques[0].cas, value: value.ficheProduitChimiques[0].cas });
                        }
                        if (
                            value.ficheProduitChimiques[0].acronyme !== undefined &&
                            !this.acronymeO.includes({
                                label: value.ficheProduitChimiques[0].acronyme,
                                value: value.ficheProduitChimiques[0].acronyme
                            })
                        ) {
                            this.acronymeO.push({
                                label: value.ficheProduitChimiques[0].acronyme,
                                value: value.ficheProduitChimiques[0].acronyme
                            });
                        }
                        if (
                            value.quantite !== undefined &&
                            this.quantiteO.indexOf({
                                label: value.quantite.toString(),
                                value: value.quantite
                            }) === -1
                        ) {
                            this.quantiteO.push({ label: value.quantite.toString(), value: value.quantite });
                        }
                        if (
                            value.disponibliteArticle !== undefined &&
                            this.disponibliteArticleO.indexOf({
                                label: value.disponibliteArticle,
                                value: value.disponibliteArticle
                            }) === -1
                        ) {
                            this.disponibliteArticleO.push({ label: value.disponibliteArticle, value: value.disponibliteArticle });
                        }
                        if (
                            value.ficheProduitChimiques[0].nom !== undefined &&
                            this.nomO.indexOf({
                                label: value.ficheProduitChimiques[0].nom,
                                value: value.ficheProduitChimiques[0].nom
                            }) === -1
                        ) {
                            this.nomO.push({ label: value.ficheProduitChimiques[0].nom, value: value.ficheProduitChimiques[0].nom });
                        }
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadAllClassi() {
        this.classificationService.query().subscribe(
            (res: HttpResponse<IClassification[]>) => {
                this.classifi = res.body;
                this.classificationO = [];
                for (let value of this.classifi) {
                    this.classificationO.push({ label: value.nomClassification, value: value.nomClassification });
                }
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
            { field: 'refArticle', header: 'Référence' },
            { field: 'cas', header: 'CAS' },
            { field: 'nom', header: 'Nom' },
            { field: 'acronyme', header: 'Acronyme' },
            { field: 'quantite', header: 'Quantite' },
            { field: 'classification', header: 'Classification' },
            { field: 'disponibliteArticle', header: 'DisponibliteArticle' }
        ];

        this.disponibliteArticleO = [
            { label: 'DISPONIBLE', value: 'DISPONIBLE' },
            { label: 'INDISPONIBLE', value: 'INDISPONIBLE' },
            { label: 'FINDESTOCK', value: 'FINDESTOCK' },
            { label: 'ENCOMMANDE', value: 'ENCOMMANDE' }
        ];
        this.loadAllClassi();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFicheArticles() {
        this.eventSubscriber = this.eventManager.subscribe('ficheArticleListModification', response => this.loadAll());
    }

    onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
