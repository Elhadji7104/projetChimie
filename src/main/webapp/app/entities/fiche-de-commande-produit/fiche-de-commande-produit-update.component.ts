import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';
import { FicheDeCommandeProduitService } from './fiche-de-commande-produit.service';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from 'app/entities/fiche-article';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'jhi-fiche-de-commande-produit-update',
    templateUrl: './fiche-de-commande-produit-update.component.html'
})
export class FicheDeCommandeProduitUpdateComponent implements OnInit {
    ficheDeCommandeProduit: IFicheDeCommandeProduit;
    isSaving: boolean;
    articleOption: SelectItem[] = [];
    fournisseurs: IFournisseur[] = [];
    private unite: string;
    private fichearticles: IFicheArticle[];
    private ficheArticle: any;
    fournisseurOption: SelectItem[] = [];
    private quantite: number;
    private labelString: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ficheDeCommandeProduitService: FicheDeCommandeProduitService,
        protected fournisseurService: FournisseurService,
        protected ficheArticleService: FicheArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheDeCommandeProduit }) => {
            this.ficheDeCommandeProduit = ficheDeCommandeProduit;
        });
        this.activatedRoute.data.subscribe(({ ficheArticle }) => {
            this.ficheArticle = ficheArticle;
        });
        this.fournisseurService.query().subscribe(
            (res: HttpResponse<IFournisseur[]>) => {
                this.fournisseurs = res.body;
                for (let value of this.fournisseurs) {
                    this.fournisseurOption.push({ label: value.nomFournisseur, value: value.nomFournisseur });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ficheArticleService.query().subscribe(
            (res: HttpResponse<IFicheArticle[]>) => {
                this.fichearticles = res.body;
                for (let value of this.fichearticles) {
                    if (value !== undefined && value.ficheProduitChimiques !== undefined) {
                        this.labelString = '';
                        if (value !== undefined && value.ficheProduitChimiques !== undefined) {
                            if (value.codeBarre !== undefined) {
                                this.labelString = this.labelString.concat(value.codeBarre);
                            }
                            if (value.ficheProduitChimiques.cas !== undefined) {
                                this.labelString = this.labelString.concat('; ' + value.ficheProduitChimiques.cas);
                            }
                            if (value.ficheProduitChimiques.nom !== undefined) {
                                this.labelString = this.labelString.concat('; ' + value.ficheProduitChimiques.nom);
                            }
                            this.articleOption.push({
                                label: this.labelString,
                                value: value
                            });
                        }
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.ficheDeCommandeProduit.dateDeCommande = moment(new Date(Date.now()));
        //this.ficheDeCommandeProduit.ficheArticle = this.ficheArticle;
        this.ficheDeCommandeProduit.fournisseurs = this.fournisseurs;
        this.isSaving = true;
        if (this.ficheDeCommandeProduit.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheDeCommandeProduitService.update(this.ficheDeCommandeProduit));
        } else {
            this.subscribeToSaveResponse(this.ficheDeCommandeProduitService.create(this.ficheDeCommandeProduit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFicheDeCommandeProduit>>) {
        result.subscribe(
            (res: HttpResponse<IFicheDeCommandeProduit>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackFournisseurById(index: number, item: IFournisseur) {
        return item.id;
    }

    trackFicheArticleById(index: number, item: IFicheArticle) {
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

    actuUnite() {
        if (this.ficheArticle.unites.length !== 0) {
            this.unite = this.ficheArticle.unites[0].libelleUnite;
        }
    }
}
