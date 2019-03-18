import { Component, OnInit } from '@angular/core';
import { FicheArticleService } from 'app/entities/fiche-article';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FicheArticle, IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleProduit, IFicheArticleProduit } from 'app/shared/model/fiche-article-produit.model';
import { SelectItem } from 'primeng/api';
import { IClassification } from 'app/shared/model/classification.model';
import { ClassificationService } from 'app/entities/classification';

@Component({
    selector: 'jhi-recherche',
    templateUrl: './recherche.component.html',
    styles: []
})
export class RechercheComponent implements OnInit {
    private cols: ({ field: string; header: string })[];
    private ficheArticles: IFicheArticle[] = [];
    private ficheArticleProduits: IFicheArticleProduit[] = [];
    refArticleO: SelectItem[];
    casO: SelectItem[];
    acronymeO: SelectItem[];
    disponibliteArticleO: SelectItem[];
    nomO: SelectItem[];
    classificationO: SelectItem[];
    private classifi: any;
    private valeursSelect: any[];
    private ficheArticlesFiltre: IFicheArticle[];
    private ficheArticlesCopie: IFicheArticle[];

    ngOnInit() {
        this.cols = [
            { field: 'refArticle', header: 'refArticle' },
            { field: 'cas', header: 'cas' },
            { field: 'nom', header: 'nom' },
            { field: 'acronyme', header: 'acronyme' },
            { field: 'classifications', header: 'classifications' },
            { field: 'disponibliteArticle', header: 'disponibliteArticle' }
        ];
        this.loadAll();
        this.loadAllClassi();
        this.ficheInitial();
    }

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
                for (let value of this.ficheArticles) {
                    let ficheArticleProduit = new FicheArticleProduit();
                    ficheArticleProduit.acronyme = value.ficheProduitChimiques[0].acronyme;
                    console.log(value.ficheProduitChimiques[0].acronyme);
                    ficheArticleProduit.cas = value.ficheProduitChimiques[0].cas;
                    ficheArticleProduit.classifications = value.classifications;
                    ficheArticleProduit.nom = value.ficheProduitChimiques[0].nom;
                    ficheArticleProduit.refArticle = value.refArticle;
                    ficheArticleProduit.disponibliteArticle = value.disponibliteArticle;
                    ficheArticleProduit.idArticle = value.id;
                    ficheArticleProduit.idProduit = value.ficheProduitChimiques[0].id;
                    this.ficheArticleProduits.push(ficheArticleProduit);
                }
                this.refArticleO = [];
                this.casO = [];
                this.acronymeO = [];
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
                            this.casO.push({
                                label: value.ficheProduitChimiques[0].cas,
                                value: value.ficheProduitChimiques[0].cas
                            });
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
                            value.disponibliteArticle !== undefined &&
                            this.disponibliteArticleO.indexOf({
                                label: value.disponibliteArticle,
                                value: value.disponibliteArticle
                            }) === -1
                        ) {
                            this.disponibliteArticleO.push({
                                label: value.disponibliteArticle,
                                value: value.disponibliteArticle
                            });
                        }
                        if (
                            value.ficheProduitChimiques[0].nom !== undefined &&
                            this.nomO.indexOf({
                                label: value.ficheProduitChimiques[0].nom,
                                value: value.ficheProduitChimiques[0].nom
                            }) === -1
                        ) {
                            this.nomO.push({
                                label: value.ficheProduitChimiques[0].nom,
                                value: value.ficheProduitChimiques[0].nom
                            });
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
                    this.classificationO.push({ label: value.nomClassification, value: value });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ficheInitial() {
        this.ficheArticlesCopie = this.ficheArticles;
    }

    filtre() {
        this.ficheArticles = this.ficheArticlesCopie;
        for (let value of this.valeursSelect) {
            console.log(this.ficheArticleProduits[0].classifications[0].nomClassification.toLowerCase().toString());
            console.log(value);
            console.log(
                this.ficheArticleProduits[0].classifications[0].nomClassification
                    .toLowerCase()
                    .toString()
                    .indexOf(value[0].nomClassification) >= 0
            );
            this.ficheArticleProduits = this.ficheArticleProduits.filter(
                fiche => fiche.classifications.filter(classe => classe.nomClassification.toLowerCase().indexOf(value) >= 0).length > 0
            );
        }
    }

    onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
