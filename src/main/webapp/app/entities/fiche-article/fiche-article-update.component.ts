import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { FicheArticle, IFicheArticle } from 'app/shared/model/fiche-article.model';
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
import { ITypeLieuStockage, TypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';
import { TypeLieuStockageDeletePopupComponent, TypeLieuStockageService } from 'app/entities/type-lieu-stockage';
import { ITypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';
import { TypeDeConditionnementService } from 'app/entities/type-de-conditionnement';
import { SelectItem } from 'primeng/api';
@Component({
    selector: 'jhi-fiche-article-update',
    templateUrl: './fiche-article-update.component.html'
})
export class FicheArticleUpdateComponent implements OnInit {
    ficheArticle: IFicheArticle = new FicheArticle();
    isSaving: boolean;

    documents: IDocument[];

    unites: IUnite[];

    ficheproduitchimiques: IFicheProduitChimique[];

    classifications: IClassification[];

    typeLieuStockage: ITypeLieuStockage[];

    droitDacceeProduits: IDroitDacceeProduit[];
    unitesSelect: any[];
    produitSelect: any[];
    etatSelect: any[];
    dispoSelect: any;
    docSelect: any;
    classiSelect: any;
    booleanProduit: boolean;
    localisationSelect: SelectItem[] = [];
    stockageSelect: SelectItem[] = [];
    localisation: ILocalisation;
    condictionnementSelect: SelectItem[] = [];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ficheArticleService: FicheArticleService,
        protected documentService: DocumentService,
        protected uniteService: UniteService,
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected classificationService: ClassificationService,
        protected droitDacceeProduitService: DroitDacceeProduitService,
        protected activatedRoute: ActivatedRoute,
        protected typeLieuStockageService: TypeLieuStockageService,
        protected lieuService: LocalisationService,
        protected stockageService: TypeLieuStockageService,
        protected condictionnementService: TypeDeConditionnementService
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
        this.lieuService.query().subscribe(
            (res: HttpResponse<ILocalisation[]>) => {
                for (let value of res.body) {
                    this.localisationSelect.push({ label: value.adresse, value: value });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.condictionnementService.query().subscribe(
            (res: HttpResponse<ITypeDeConditionnement[]>) => {
                for (let value of res.body) {
                    this.condictionnementSelect.push({ label: value.libelleConditionnement, value: value });
                }
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
                this.droitDacceeProduits = res.body;
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
        this.dispoSelect.push({ label: 'DISPONIBLE', value: 'DISPONIBLE' });
        this.dispoSelect.push({ label: 'INDISPONIBLE', value: 'INDISPONIBLE' });
        this.dispoSelect.push({ label: 'ENCOMMANDE', value: 'ENCOMMANDE' });
        this.dispoSelect.push({ label: 'FINDESTOCK', value: 'FINDESTOCK' });
        this.dispoSelect.push({ label: 'ENLIVRAISON', value: 'ENLIVRAISON' });
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
        console.log(this.ficheArticle);
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
}
