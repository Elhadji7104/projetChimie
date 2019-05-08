import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { FicheProduitChimiqueService } from 'app/entities/fiche-produit-chimique';
import { FicheArticleService } from 'app/entities/fiche-article';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FicheArticle, IFicheArticle, DisponibliteArticle } from 'app/shared/model/fiche-article.model';
import { FicheProduitChimique, IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { SelectItem } from 'primeng/api';
import { ClassificationService } from 'app/entities/classification';
import { IClassification } from 'app/shared/model/classification.model';
import { UniteService } from 'app/entities/unite';
import { IUnite } from 'app/shared/model/unite.model';
import { ILocalisation, Localisation } from 'app/shared/model/localisation.model';
import { LocalisationService } from 'app/entities/localisation';
import { ITypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';
import { TypeLieuStockageService } from 'app/entities/type-lieu-stockage';
import { ITypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';
import { TypeDeConditionnementService } from 'app/entities/type-de-conditionnement';
import { GroupeService } from 'app/entities/groupe';
import { IGroupe, Groupe } from 'app/shared/model/groupe.model';
import { Observable } from 'rxjs';
import { DocumentService } from 'app/entities/document';
import { IDocument, Document } from 'app/shared/model/document.model';
import { AccountService } from 'app/core';
import { DroitDacceeProduitService } from 'app/entities/droit-daccee-produit/droit-daccee-produit.service';
import { DroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';

@Component({
    selector: 'jhi-processus',
    templateUrl: './processus.component.html',
    styles: []
})
export class ProcessusComponent implements OnInit {
    ficheProduits: IFicheProduitChimique = new FicheProduitChimique();
    ficheProduitChimique: IFicheProduitChimique[];
    booleanChimique: boolean;
    isSaving: boolean;
    fichearticles: any;
    CasSelect: SelectItem[] = [];
    NomSelect: SelectItem[] = [];
    formuleSelect: SelectItem[] = [];
    ficheArticle: IFicheArticle = new FicheArticle();
    EtatSelect: SelectItem[] = [];
    DispoSelect: SelectItem[] = [];
    condictionnementSelect: SelectItem[] = [];
    documentInput: string;
    classiSelect: SelectItem[] = [];
    droitSelect: SelectItem[] = [];
    unitesSelect: SelectItem[] = [];
    localisationSelect: SelectItem[] = [];
    stockageSelect: SelectItem[] = [];
    localisation: ILocalisation;
    documentArray: IDocument = new Document();
    uniteArray: IUnite;
    groupe: IGroupe;
    droit: IGroupe[];
    typeCond: ITypeDeConditionnement;
    classiArray: IClassification[] = [];
    test: IFicheArticle = new FicheArticle();
    codeInterne: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected ficheArticleService: FicheArticleService,
        protected classificationService: ClassificationService,
        protected groupeService: GroupeService,
        protected activatedRoute: ActivatedRoute,
        protected uniteService: UniteService,
        protected lieuService: LocalisationService,
        protected stockageService: TypeLieuStockageService,
        protected condictionnementService: TypeDeConditionnementService,
        protected documentService: DocumentService,
        private accountService: AccountService,
        protected droitDacceeProduitService: DroitDacceeProduitService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheArticle }) => {
            if (ficheArticle) {
                this.ficheArticle = ficheArticle;
                console.log(ficheArticle);

                this.ficheProduits = ficheArticle.ficheProduitChimiques;
                if (ficheArticle.documents[0]) {
                    this.documentInput = ficheArticle.documents[0].lien;
                }
                if (ficheArticle.unites[0]) {
                    this.uniteArray = ficheArticle.unites[0].libelleUnite;
                }
                this.classiArray = ficheArticle.classifications;
                this.droit = ficheArticle.droitDacceeProduits;
                this.typeCond = ficheArticle.typeDeConditionnements;
            }
        });

        this.groupeService.query().subscribe(
            (res: HttpResponse<IGroupe[]>) => {
                for (let value of res.body) {
                    this.droitSelect.push({ label: value.nomGroupe, value: value });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.lieuService.query().subscribe(
            (res: HttpResponse<ILocalisation[]>) => {
                for (let value of res.body) {
                    this.localisationSelect.push({ label: value.adresse, value: value });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.classificationService.query().subscribe(
            (res: HttpResponse<IClassification[]>) => {
                for (let value of res.body) {
                    this.classiSelect.push({ label: value.nomClassification, value: value });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.uniteService.query().subscribe(
            (res: HttpResponse<IUnite[]>) => {
                for (let value of res.body) {
                    this.unitesSelect.push({ label: value.libelleUnite, value: value });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ficheProduitChimiqueService.query().subscribe(
            (res: HttpResponse<IFicheProduitChimique[]>) => {
                for (let value of res.body) {
                    if (value !== undefined) {
                        if (value.cas !== undefined) {
                            this.CasSelect.push({ label: value.cas, value: value });
                        }
                        if (value.nom !== undefined) {
                            this.NomSelect.push({ label: value.nom, value: value });
                        }
                        if (value.formule !== undefined) {
                            this.formuleSelect.push({ label: value.formule, value: value });
                        }
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.getOptionsEtat();

        this.getOptionsDispo();

        this.condictionnementService.query().subscribe(
            (res: HttpResponse<ITypeDeConditionnement[]>) => {
                for (let value of res.body) {
                    this.condictionnementSelect.push({ label: value.libelleConditionnement, value: value });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.groupeService.getCurrentGroup().subscribe(
            (res: HttpResponse<IGroupe>) => {
                console.log(res.body.nomGroupe);
                this.ficheArticle.codeInterne = res.body.nomGroupe;
                this.codeInterne = res.body.nomGroupe;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        if (this.ficheProduits.codeNacre === undefined) {
            this.ficheProduits.codeNacre = 'NA21';
        }
        if (this.ficheArticle.quantite === undefined) {
            this.ficheArticle.quantite = 0;
        }
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    getOptionsEtat() {
        this.EtatSelect.push({ label: 'SOLIDE', value: 'SOLIDE' });
        this.EtatSelect.push({ label: 'LIQUIDE', value: 'LIQUIDE' });
        this.EtatSelect.push({ label: 'GAZEUX', value: 'GAZEUX' });
    }

    getOptionsDispo() {
        this.DispoSelect.push({ label: 'DISPONIBLE', value: 'DISPONIBLE' });
        this.DispoSelect.push({ label: 'INDISPONIBLE', value: 'INDISPONIBLE' });
        this.DispoSelect.push({ label: 'ENCOMMANDE', value: 'ENCOMMANDE' });
        this.DispoSelect.push({ label: 'FINDESTOCK', value: 'FINDESTOCK' });
        this.DispoSelect.push({ label: 'ENLIVRAISON', value: 'ENLIVRAISON' });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    selectionStockage() {
        this.stockageService.query().subscribe(
            (res: HttpResponse<ITypeLieuStockage[]>) => {
                for (let value of res.body) {
                    if (value.localisation.id === this.localisation.id) {
                        this.stockageSelect.push({ label: value.libelleLieu, value: value });
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    save() {
        if (
            this.ficheProduits.nom !== undefined ||
            this.ficheProduits.acronyme !== undefined ||
            this.ficheProduits.cas !== undefined ||
            this.ficheProduits.formule !== undefined
        ) {
            this.ficheArticle.ficheProduitChimiques = [];
            if (this.booleanChimique) {
                this.subscribeToSaveResponseProduit(this.ficheProduitChimiqueService.create(this.ficheProduits));
            } else {
                this.ficheArticle.documents = [];
                if (this.documentInput !== undefined) {
                    this.documentArray.lien = this.documentInput;
                    this.subscribeToSaveResponseDoc(this.documentService.create(this.documentArray));
                } else {
                    this.createArticle();
                }
            }
        }
    }
    createDroitAcces() {
        /*  for (let acces of this.droit) {
            let variable = new DroitDacceeProduit;
            variable.ficheArticles = [];
            variable.ficheArticles[0] = this.ficheArticle;
            variable.groupe = new Groupe();
            variable.groupe = acces;
            this.droitDacceeProduitService.create(variable);
        }*/
    }

    private createArticle() {
        if (this.ficheArticle.disponibliteArticle === undefined) {
            this.ficheArticle.disponibliteArticle = DisponibliteArticle.DISPONIBLE;
        }
        if (this.ficheArticle.etatPhysique === undefined) {
            this.ficheArticle.etatPhysique = 'LIQUIDE';
        }
        this.ficheArticle.codeBarre = this.codeInterne + '-' + this.ficheArticle.refArticle;
        // Code Interne a faire avec le REST de groupe
        this.ficheArticle.unites = [];
        this.ficheArticle.unites[0] = this.uniteArray;
        this.ficheArticle.classifications = [];
        this.ficheArticle.classifications = this.classiArray;
        console.log(this.ficheArticle.classifications);
        // this.ficheArticle.groupe = this.groupe2;
        this.createDroitAcces();
        if (this.ficheArticle.id !== undefined) {
            this.subscribeToSaveResponseArticle(this.ficheArticleService.update(this.ficheArticle));
        } else {
            this.subscribeToSaveResponseArticle(this.ficheArticleService.create(this.ficheArticle));
        }

        this.isSaving = true;
        this.previousState();
    }

    protected onSaveDocument(res: HttpResponse<IDocument>) {
        this.ficheArticle.documents[0] = res.body;
        this.createArticle();
    }

    protected onSaveProduit(res: HttpResponse<IFicheProduitChimique>) {
        this.ficheArticle.ficheProduitChimiques[0] = res.body;
        this.ficheArticle.documents = [];
        if (this.documentInput !== undefined) {
            this.documentArray.lien = this.documentInput;
            this.subscribeToSaveResponseDoc(this.documentService.create(this.documentArray));
        } else {
            this.createArticle();
        }
    }

    protected subscribeToSaveResponseProduit(result: Observable<HttpResponse<IFicheProduitChimique>>) {
        result.subscribe(
            (res: HttpResponse<IFicheProduitChimique>) => this.onSaveProduit(res),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected subscribeToSaveResponseArticle(result: Observable<HttpResponse<IFicheArticle>>) {
        result.subscribe((res: HttpResponse<IFicheArticle>) => this.onSaveError(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected subscribeToSaveResponseDoc(result: Observable<HttpResponse<IDocument>>) {
        result.subscribe((res: HttpResponse<IDocument>) => this.onSaveDocument(res), (res: HttpErrorResponse) => this.onSaveError());
    }

    previousState() {
        window.history.back();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
