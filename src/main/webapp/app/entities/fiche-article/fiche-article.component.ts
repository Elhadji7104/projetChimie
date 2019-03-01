import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Sort } from '@angular/material';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { AccountService } from 'app/core';
import { FicheArticleService } from './fiche-article.service';
import { SelectItem, SortEvent } from 'primeng/api';
import { ClassificationService } from 'app/entities/classification';
import { IClassification } from 'app/shared/model/classification.model';

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
    refArticle: string = '';
    cas: string = '';
    nom: string = '';
    acronyme: string = '';
    classification: string = '';
    disponibliteArticle: string = '';
    valeursSelect: any[];

    users: User[];
    cols: any[];
    ficheArticles: IFicheArticle[];
    ficheArticlesCopie: IFicheArticle[];
    currentAccount: any;
    eventSubscriber: Subscription;
    dispo: SelectItem[];
    classifi: IClassification[];
    classifiSelect: SelectItem[];
    private i: boolean;
    private ficheArticlesFiltre: IFicheArticle[];
    private filtreSauvegarde: IFicheArticle[];

    constructor(
        protected classificationService: ClassificationService,
        protected ficheArticleService: FicheArticleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    getOptions() {
        this.classifiSelect = [];
        for (let value of this.classifi) {
            this.classifiSelect.push({ label: value.nomClassification, value: value.nomClassification });
        }
        return this.classifiSelect;
    }

    loadAll() {
        this.ficheArticleService.query().subscribe(
            (res: HttpResponse<IFicheArticle[]>) => {
                this.ficheArticles = res.body;
                this.ficheArticlesCopie = this.ficheArticles;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadAllClassi() {
        this.classificationService.query().subscribe(
            (res: HttpResponse<IClassification[]>) => {
                this.classifi = res.body;
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
            { field: 'refArticle', header: 'refArticle' },
            { field: 'cas', header: 'cas' },
            { field: 'nom', header: 'nom' },
            { field: 'acronyme', header: 'acronyme' },
            { field: 'classification', header: 'classification' },
            { field: 'disponibliteArticle', header: 'disponibliteArticle' }
        ];

        this.dispo = [
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

    trackId(index: number, item: IFicheArticle) {
        return item.id;
    }

    registerChangeInFicheArticles() {
        this.eventSubscriber = this.eventManager.subscribe('ficheArticleListModification', response => this.loadAll());
    }

    ficheInitial() {
        this.ficheArticles = this.ficheArticlesCopie;
    }

    filtre(values, field) {
        this.ficheInitial();

        console.log(this.valeursSelect);

        this.i = true;
        for (let value of this.valeursSelect) {
            if (this.i == true) {
                this.ficheArticlesFiltre = this.ficheArticles.filter(
                    ficheArticles =>
                        ficheArticles.classifications.filter(classe => classe.nomClassification.toLowerCase().indexOf(value) >= 0).length >
                        0
                );
            } else {
                this.filtreSauvegarde = this.ficheArticles.filter(
                    ficheArticles =>
                        ficheArticles.classifications.filter(classe => classe.nomClassification.toLowerCase().indexOf(value) >= 0).length >
                        0
                );
                for (let value of this.filtreSauvegarde) {
                    if (this.ficheArticlesFiltre.indexOf(value) < 0) {
                        this.ficheArticlesFiltre.push(value);
                    }
                }
            }
            this.i = false;
        }
        this.ficheArticles = this.ficheArticlesFiltre;
        this.i = true;
        if (this.refArticle !== '') {
            this.ficheArticles = this.ficheArticles.filter(
                ficheArticles => ficheArticles.refArticle.toLowerCase().indexOf(this.refArticle) >= 0
            );
        }
        if (this.cas !== '') {
            this.ficheArticles = this.ficheArticles.filter(
                ficheArticles => ficheArticles.ficheProduitChimiques[0].cas.toLowerCase().indexOf(this.cas) >= 0
            );
        }
        if (this.nom !== '') {
            this.ficheArticles = this.ficheArticles.filter(
                ficheArticles => ficheArticles.ficheProduitChimiques[0].nom.toLowerCase().indexOf(this.nom) >= 0
            );
        }
        if (this.acronyme !== '') {
            this.ficheArticles = this.ficheArticles.filter(
                ficheArticles => ficheArticles.ficheProduitChimiques[0].acronyme.toLowerCase().indexOf(this.acronyme) >= 0
            );
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    methodThatOrdersTBodyRows(sort1: Sort) {
        this.ficheArticles.sort((a: IFicheArticle, b: IFicheArticle) => {
            if ((a.codeBarre || '').toLowerCase() < (b.codeBarre || '').toLowerCase()) {
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
    }

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
