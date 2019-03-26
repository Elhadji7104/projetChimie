import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { FicheProduitChimiqueService } from 'app/entities/fiche-produit-chimique';
import { FicheArticleService } from 'app/entities/fiche-article';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FicheArticle, IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheProduitChimique, IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { SelectItem } from 'primeng/api';
import { IDocument } from 'app/shared/model/document.model';
import { Document } from 'app/shared/model/document.model';
import { ClassificationService } from 'app/entities/classification';
import { DroitDacceeProduitService } from 'app/entities/droit-daccee-produit';
import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { IClassification } from 'app/shared/model/classification.model';
import { UniteService } from 'app/entities/unite';
import { IUnite } from 'app/shared/model/unite.model';

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
    private CasSelect: SelectItem[];
    private NomSelect: SelectItem[];
    private AcronymeSelect: SelectItem[];
    private formuleSelect: SelectItem[];
    ficheArticle: IFicheArticle = new FicheArticle();
    EtatSelect: SelectItem[];
    private DispoSelect: SelectItem[];

    document: IDocument = new Document();
    classiSelect: SelectItem[];
    droitSelect: SelectItem[];
    private droit: IDroitDacceeProduit[];
    private classi: IClassification[];
    private unites: IUnite[];
    private unitesSelect: SelectItem[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected ficheArticleService: FicheArticleService,
        protected classificationService: ClassificationService,
        protected droitService: DroitDacceeProduitService,
        protected activatedRoute: ActivatedRoute,
        protected uniteService: UniteService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheProduitChimique }) => {
            this.ficheProduitChimique = ficheProduitChimique;
        });
        this.droitService.query().subscribe(
            (res: HttpResponse<IDroitDacceeProduit[]>) => {
                this.droit = res.body;
                this.droitSelect = [];
                for (let value of this.droitSelect) {
                    this.droitSelect.push({ label: value.label, value: value.label });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.classificationService.query().subscribe(
            (res: HttpResponse<IClassification[]>) => {
                this.classi = res.body;
                this.classiSelect = [];
                for (let value of this.classi) {
                    this.classiSelect.push({ label: value.nomClassification, value: value.nomClassification });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.uniteService.query().subscribe(
            (res: HttpResponse<IUnite[]>) => {
                this.unites = res.body;
                this.unitesSelect = [];
                for (let value of this.unites) {
                    this.classiSelect.push({ label: value.libelleUnite, value: value.libelleUnite });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ficheProduitChimiqueService.query().subscribe(
            (res: HttpResponse<IFicheProduitChimique[]>) => {
                this.ficheProduitChimique = res.body;
                this.CasSelect = [];
                this.NomSelect = [];
                this.AcronymeSelect = [];
                this.formuleSelect = [];

                for (let value of this.ficheProduitChimique) {
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
    }

    getOptionsEtat() {
        this.EtatSelect = [];
        this.EtatSelect.push({ label: 'SOLIDE', value: 'SOLIDE' });
        this.EtatSelect.push({ label: 'LIQUIDE', value: 'LIQUIDE' });
        this.EtatSelect.push({ label: 'GAZEUX', value: 'GAZEUX' });
        return this.EtatSelect;
    }

    getOptionsDispo() {
        this.DispoSelect = [];
        this.DispoSelect.push({ label: 'DISPONIBLE', value: 'SOLIDE' });
        this.DispoSelect.push({ label: 'INDISPONIBLE', value: 'LIQUIDE' });
        this.DispoSelect.push({ label: 'ENCOMMANDE', value: 'GAZEUX' });
        this.DispoSelect.push({ label: 'FINDESTOCK', value: 'GAZEUX' });
        return this.DispoSelect;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
