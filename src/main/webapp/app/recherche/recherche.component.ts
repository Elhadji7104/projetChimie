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
import { ExportExcelService } from 'app/export-excel.service';
import { Router } from '@angular/router';
@Component({
    selector: 'jhi-recherche',
    templateUrl: './recherche.component.html',
    styles: []
})
export class RechercheComponent implements OnInit {
    cols: ({ field: string; header: string })[];
    ficheArticles: IFicheArticle[] = [];
    ficheArticleProduits: IFicheArticleProduit[] = [];
    codeBarreO: SelectItem[];
    casO: SelectItem[];
    acronymeO: SelectItem[];
    disponibliteArticleO: SelectItem[];
    nomO: SelectItem[];
    classificationO: SelectItem[];
    formuleO: SelectItem[];
    classifi: any;
    valeursSelect: any[];
    ficheArticlesProduitsCopie: IFicheArticleProduit[];
    conserve: IFicheArticleProduit[];
    tableauMultiselection: IFicheArticleProduit[] = [];
    codeBarre: any[] = [];
    classification: any[] = [];
    disponibliteArticle: any[] = [];
    cas: any[] = [];
    nom: any[] = [];
    acronyme: any[] = [];
    formule: any[] = [];
    attente: any[] = [];

    ngOnInit() {
        this.cols = [
            { field: 'codeBarre', header: 'Code Barre' },
            { field: 'cas', header: 'Cas' },
            { field: 'nom', header: 'Nom' },
            { field: 'acronyme', header: 'Acronyme' },
            { field: 'formule', header: 'Formule' }
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
        protected accountService: AccountService,
        protected exportExcelService: ExportExcelService,
        protected router: Router
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
                        ficheArticleProduit.formule = value.ficheProduitChimiques[0].formule;
                    }
                    ficheArticleProduit.classifications = value.classifications;
                    ficheArticleProduit.codeBarre = value.codeBarre;
                    ficheArticleProduit.disponibliteArticle = value.disponibliteArticle;
                    ficheArticleProduit.idArticle = value.id;
                    ficheArticleProduit.typeLieuStockage = value.typeLieuStockage.libelleLieu;

                    this.ficheArticleProduits.push(ficheArticleProduit);
                }
                this.codeBarreO = [];
                this.casO = [];
                this.acronymeO = [];
                this.disponibliteArticleO = [];
                this.nomO = [];
                this.formuleO = [];

                for (let value of this.ficheArticles) {
                    if (value !== undefined) {
                        if (value.codeBarre !== undefined && this.verifiDoublon(value.codeBarre, this.codeBarreO)) {
                            this.codeBarreO.push({ label: value.codeBarre, value: value.codeBarre });
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
                                value.ficheProduitChimiques[0].formule !== undefined &&
                                this.verifiDoublon(value.ficheProduitChimiques[0].formule, this.formuleO)
                            ) {
                                this.formuleO.push({
                                    label: value.ficheProduitChimiques[0].formule,
                                    value: value.ficheProduitChimiques[0].formule
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

    filtre(value, field: any, sens: any) {
        switch (field) {
            case 'codeBarre':
                this.codeBarre = value;
                break;
            case 'classification':
                this.classification = value;
                break;
            case 'disponibilite':
                this.disponibliteArticle = value;

                break;
            case 'cas':
                this.cas = value;
                break;
            case 'nom':
                this.nom = value;
                break;
            case 'acronyme':
                this.acronyme = value;
                break;
            case 'formule':
                this.formule = value;
                break;
        }
        this.eleverProduitchimique();
    }

    private eleverProduitchimique() {
        this.ficheArticleProduits = this.ficheArticlesProduitsCopie;
        this.tableauMultiselection = [];

        for (let value of this.classification) {
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

        if (this.classification.length !== 0) {
            this.ficheArticleProduits = this.tableauMultiselection;
        }

        this.attente = [];
        for (let value of this.ficheArticleProduits) {
            let casBoolean = false;
            let nomBoolean = false;
            let acronymeBoolean = false;
            let formuleBoolean = false;
            let codeBarreBoolean = false;
            let disponibiliteBoolean = false;

            if (this.codeBarre.includes(value.codeBarre) || this.codeBarre.length === 0) {
                codeBarreBoolean = true;
            }

            if (this.disponibliteArticle.includes(value.disponibliteArticle) || this.disponibliteArticle.length === 0) {
                disponibiliteBoolean = true;
            }

            if (this.cas.includes(value.cas) || this.cas.length === 0) {
                casBoolean = true;
            }

            if (this.nom.includes(value.nom) || this.nom.length === 0) {
                nomBoolean = true;
            }

            if (this.acronyme.includes(value.acronyme) || this.acronyme.length === 0) {
                acronymeBoolean = true;
            }

            if (this.formule.includes(value.formule) || this.formule.length === 0) {
                formuleBoolean = true;
            }

            if (casBoolean && nomBoolean && acronymeBoolean && formuleBoolean && codeBarreBoolean && disponibiliteBoolean) {
                this.attente.push(value);
            }
        }
        console.log(this.attente);
        if (
            this.cas.length === 0 &&
            this.acronyme.length === 0 &&
            this.nom.length === 0 &&
            this.codeBarre.length === 0 &&
            this.disponibliteArticle.length === 0 &&
            this.classification.length === 0 &&
            this.formule.length === 0
        ) {
            this.ficheArticleProduits = this.ficheArticlesProduitsCopie;
        } else {
            this.ficheArticleProduits = this.attente;
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

    exportCSV(select: boolean) {
        if (select) {
            this.exportExcelService.set(this.ficheArticlesProduitsCopie);
        } else {
            this.exportExcelService.set(this.ficheArticleProduits);
        }
        this.router.navigate(['/', { outlets: { popup: 'fiche-produit-chimique/print' } }]);
    }

    onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
