import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { FicheProduitChimiqueService } from 'app/entities/fiche-produit-chimique';
import { FicheArticleService } from 'app/entities/fiche-article';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FicheArticle, IFicheArticle } from 'app/shared/model/fiche-article.model';
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
import { IGroupe } from 'app/shared/model/groupe.model';
import { Observable } from 'rxjs';
import { DocumentService } from 'app/entities/document';
import { IDocument, Document } from 'app/shared/model/document.model';
import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-processus',
    templateUrl: './processus.component.html',
    styles: []
})
export class ProcessusComponent implements OnInit {
    ficheProduits: IFicheProduitChimique = new FicheProduitChimique();
    ficheProduitChimique: IFicheProduitChimique[];
    booleanChimique: boolean;
    private isSaving: boolean;
    fichearticles: any;
    private CasSelect: SelectItem[] = [];
    private NomSelect: SelectItem[] = [];
    private formuleSelect: SelectItem[] = [];
    ficheArticle: IFicheArticle = new FicheArticle();
    EtatSelect: SelectItem[] = [];
    private DispoSelect: SelectItem[] = [];
    private condictionnementSelect: SelectItem[] = [];
    private documentInput: string;
    private classiSelect: SelectItem[] = [];
    private droitSelect: SelectItem[] = [];
    private unitesSelect: SelectItem[] = [];
    private localisationSelect: SelectItem[] = [];
    private stockageSelect: SelectItem[] = [];
    private localisation: ILocalisation;
    private documentArray: IDocument = new Document();
    private uniteArray: IUnite;
    private groupe2: IGroupe;
    private typeCond: ITypeDeConditionnement;
    private classiArray: IClassification;
    test: IFicheArticle = new FicheArticle();
    private codeInterne: string;

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
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheProduitChimique }) => {
            this.ficheProduitChimique = ficheProduitChimique;
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
        this.ficheArticle.ficheProduitChimiques = [];
        this.ficheArticle.ficheProduitChimiques.push(this.ficheProduits);
        if (this.booleanChimique) {
            this.subscribeToSaveResponseProduit(this.ficheProduitChimiqueService.create(this.ficheProduits));
        }

        this.ficheArticle.documents = [];
        if (this.documentInput !== undefined) {
            this.documentArray.lien = this.documentInput;
            this.documentArray.ficheArticles = [];
            this.documentArray.ficheArticles.push(this.ficheArticle);
            this.subscribeToSaveResponseDoc(this.documentService.create(this.documentArray));
        }

        this.ficheArticle.codeBarre = this.codeInterne + '-' + this.ficheArticle.refArticle;

        // Code Interne a faire avec le REST de groupe
        this.ficheArticle.unites = [];
        this.ficheArticle.unites.push(this.uniteArray);
        this.ficheArticle.classifications = [];

        if (this.ficheArticle.id !== undefined) {
            this.subscribeToSaveResponseArticle(this.ficheArticleService.update(this.ficheArticle));
        } else {
            console.log(this.ficheArticleService.create(this.ficheArticle));

            console.log(this.subscribeToSaveResponseArticle(this.ficheArticleService.create(this.ficheArticle)));
        }
        console.log(this.ficheArticle);
        //this.router.navigateByUrl('/processus-metier/' + this.ficheArticle.refArticle + '/view');
    }

    protected subscribeToSaveResponseProduit(result: Observable<HttpResponse<IFicheProduitChimique>>) {
        result.subscribe(
            (res: HttpResponse<IFicheProduitChimique>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected subscribeToSaveResponseArticle(result: Observable<HttpResponse<IFicheArticle>>) {
        result.subscribe((res: HttpResponse<IFicheArticle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
        console.log(this.isSaving);
    }

    protected subscribeToSaveResponseDoc(result: Observable<HttpResponse<IDocument>>) {
        result.subscribe((res: HttpResponse<IDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = true;
        this.previousState();
    }

    previousState() {
        window.history.back();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
