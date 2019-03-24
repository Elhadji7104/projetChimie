import { Component, OnInit } from '@angular/core';
import { FicheArticleService } from 'app/entities/fiche-article';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
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
    codeBarreO: SelectItem[];
    casO: SelectItem[];
    acronymeO: SelectItem[];
    disponibliteArticleO: SelectItem[];
    nomO: SelectItem[];
    classificationO: SelectItem[];
    private classifi: any;
    private valeursSelect: any[];
    private ficheArticlesProduitsCopie: IFicheArticleProduit[];
    private conserve: IFicheArticleProduit[];
    tableauMultiselection: IFicheArticleProduit[] = [];

    ngOnInit() {
        this.cols = [
            { field: 'codeBarre', header: 'codeBarre' },
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
                    if (value.ficheProduitChimiques[0] !== undefined) {
                        value.ficheProduitChimiques[0].acronyme !== undefined
                            ? (ficheArticleProduit.acronyme = value.ficheProduitChimiques[0].acronyme)
                            : (ficheArticleProduit.acronyme = null);
                        ficheArticleProduit.cas = value.ficheProduitChimiques[0].cas;
                        ficheArticleProduit.idProduit = value.ficheProduitChimiques[0].id;
                        ficheArticleProduit.nom = value.ficheProduitChimiques[0].nom;
                    }
                    ficheArticleProduit.classifications = value.classifications;
                    ficheArticleProduit.codeBarre = value.codeBarre;
                    ficheArticleProduit.disponibliteArticle = value.disponibliteArticle;
                    ficheArticleProduit.idArticle = value.id;

                    this.ficheArticleProduits.push(ficheArticleProduit);
                }
                this.codeBarreO = [];
                this.casO = [];
                this.acronymeO = [];
                this.disponibliteArticleO = [];
                this.nomO = [];

                for (let value of this.ficheArticles) {
                    if (value !== undefined) {
                        if (value.refArticle !== undefined && this.verifiDoublon(value.refArticle, this.codeBarreO)) {
                            this.codeBarreO.push({ label: value.refArticle, value: value.refArticle });
                        }
                        if (value.ficheProduitChimiques[0] !== undefined) {
                            if (
                                value.ficheProduitChimiques[0].cas !== undefined &&
                                this.verifiDoublon(value.ficheProduitChimiques[0].cas, this.casO)
                            ) {
                                this.casO.push({
                                    label: value.ficheProduitChimiques[0].cas,
                                    value: value.ficheProduitChimiques[0].cas
                                });
                            }

                            if (
                                value.ficheProduitChimiques[0].acronyme !== undefined &&
                                this.verifiDoublon(value.ficheProduitChimiques[0].acronyme, this.acronymeO)
                            ) {
                                this.acronymeO.push({
                                    label: value.ficheProduitChimiques[0].acronyme,
                                    value: value.ficheProduitChimiques[0].acronyme
                                });
                            }
                            if (
                                value.ficheProduitChimiques[0].nom !== undefined &&
                                this.verifiDoublon(value.ficheProduitChimiques[0].nom, this.nomO)
                            ) {
                                this.nomO.push({
                                    label: value.ficheProduitChimiques[0].nom,
                                    value: value.ficheProduitChimiques[0].nom
                                });
                            }
                        }
                        if (
                            value.disponibliteArticle !== undefined &&
                            this.verifiDoublon(value.disponibliteArticle, this.disponibliteArticleO)
                        ) {
                            this.disponibliteArticleO.push({
                                label: value.disponibliteArticle,
                                value: value.disponibliteArticle
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
        this.ficheArticlesProduitsCopie = this.ficheArticleProduits;
    }

    filtre(tab: IClassification[], field: any, sens: any) {
        console.log(tab);

        this.ficheArticleProduits = this.ficheArticlesProduitsCopie;
        this.tableauMultiselection = [];
        for (let value of tab) {
            let tableau = this.ficheArticlesProduitsCopie;
            tableau = tableau.filter(
                fiche =>
                    fiche.classifications.filter(classe => classe.nomClassification.toLowerCase().indexOf(value.nomClassification) >= 0)
                        .length > 0
            );
            for (let choix of tableau) {
                if (!this.tableauMultiselection.includes(choix)) {
                    this.tableauMultiselection.push(choix);
                }
            }
        }
        if (this.tableauMultiselection.length === 0) {
            this.ficheArticleProduits = this.ficheArticlesProduitsCopie;
        } else {
            this.ficheArticleProduits = this.tableauMultiselection;
        }
    }

    verifiDoublon(label: string, Select: SelectItem[]) {
        for (let value of Select) {
            if (value.label === label) {
                return false;
            }
        }
        return true;
    }

    onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
