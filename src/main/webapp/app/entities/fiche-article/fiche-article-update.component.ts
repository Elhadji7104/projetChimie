import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from './fiche-article.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';
import { IUnite } from 'app/shared/model/unite.model';
import { UniteService } from 'app/entities/unite';
import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { FicheProduitChimiqueService } from 'app/entities/fiche-produit-chimique';
import { IClassification } from 'app/shared/model/classification.model';
import { ClassificationService } from 'app/entities/classification';
import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { DroitDacceeProduitService } from 'app/entities/droit-daccee-produit';
import { ILocalisation } from 'app/shared/model/localisation.model';
import { LocalisationService } from 'app/entities/localisation';

@Component({
    selector: 'jhi-fiche-article-update',
    templateUrl: './fiche-article-update.component.html'
})
export class FicheArticleUpdateComponent implements OnInit {
    ficheArticle: IFicheArticle;
    isSaving: boolean;

    documents: IDocument[];

    unites: IUnite[];

    ficheproduitchimiques: IFicheProduitChimique[];

    classifications: IClassification[];

    localisations: ILocalisation[];

    droitdacceeproduits: IDroitDacceeProduit[];
    private unitesSelect: any[];
    private produitSelect: any[];
    private etatSelect: any[];
    private dispoSelect: any;
    private docSelect: any;
    private classiSelect: any;
    private quantiteSelect: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ficheArticleService: FicheArticleService,
        protected documentService: DocumentService,
        protected uniteService: UniteService,
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected classificationService: ClassificationService,
        protected droitDacceeProduitService: DroitDacceeProduitService,
        protected activatedRoute: ActivatedRoute,
        protected localisationService: LocalisationService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheArticle }) => {
            this.ficheArticle = ficheArticle;
        });
        this.documentService.query().subscribe(
            (res: HttpResponse<IDocument[]>) => {
                this.documents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.uniteService.query().subscribe(
            (res: HttpResponse<IUnite[]>) => {
                this.unites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ficheProduitChimiqueService.query().subscribe(
            (res: HttpResponse<IFicheProduitChimique[]>) => {
                this.ficheproduitchimiques = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.classificationService.query().subscribe(
            (res: HttpResponse<IClassification[]>) => {
                this.classifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.droitDacceeProduitService.query().subscribe(
            (res: HttpResponse<IDroitDacceeProduit[]>) => {
                this.droitdacceeproduits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.localisationService.query().subscribe(
            (res: HttpResponse<ILocalisation[]>) => {
                this.localisations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    getOptions() {
        this.unitesSelect = [];
        for (let value of this.unites) {
            this.unitesSelect.push({ label: value.libelleUnite, value: value.libelleUnite });
        }
        return this.unitesSelect;
    }

    getOptionsProduit() {
        this.produitSelect = [];
        for (let value of this.ficheproduitchimiques) {
            this.produitSelect.push({ label: value.nom + '-' + value.cas + '-' + value.acronyme, value: value });
        }
        return this.produitSelect;
    }

    getOptionsEtat() {
        this.etatSelect = [];
        this.etatSelect.push({ label: 'SOLIDE', value: 'SOLIDE' });
        this.etatSelect.push({ label: 'LIQUIDE', value: 'LIQUIDE' });
        this.etatSelect.push({ label: 'GAZEUX', value: 'GAZEUX' });
        return this.etatSelect;
    }

    getOptionsDispo() {
        this.dispoSelect = [];
        this.dispoSelect.push({ label: 'DISPONIBLE', value: 'SOLIDE' });
        this.dispoSelect.push({ label: 'INDISPONIBLE', value: 'LIQUIDE' });
        this.dispoSelect.push({ label: 'ENCOMMANDE', value: 'GAZEUX' });
        this.dispoSelect.push({ label: 'FINDESTOCK', value: 'GAZEUX' });
        return this.dispoSelect;
    }

    documentSelected() {
        this.docSelect = [];
        for (let value of this.documents) {
            this.docSelect.push({ label: value.lien, value: value });
        }
        return this.docSelect;
    }

    classiSelected() {
        this.classiSelect = [];
        for (let value of this.classifications) {
            this.classiSelect.push({ label: value.nomClassification, value: value });
        }
        return this.classiSelect;
    }

    save() {
        this.ficheArticle.codeBarre = 'AA' + '-' + this.ficheArticle.refArticle;

        this.isSaving = true;
        if (this.ficheArticle.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheArticleService.update(this.ficheArticle));
        } else {
            this.subscribeToSaveResponse(this.ficheArticleService.create(this.ficheArticle));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFicheArticle>>) {
        result.subscribe((res: HttpResponse<IFicheArticle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentById(index: number, item: IDocument) {
        return item.id;
    }

    trackUniteById(index: number, item: IUnite) {
        return item.id;
    }

    trackFicheProduitChimiqueById(index: number, item: IFicheProduitChimique) {
        return item.id;
    }

    trackClassificationById(index: number, item: IClassification) {
        return item.id;
    }

    trackDroitDacceeProduitById(index: number, item: IDroitDacceeProduit) {
        return item.id;
    }

    tracklocalisationtById(index: number, item: ILocalisation) {
        return item.id;
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
}
