import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { AccountService } from 'app/core';
import { FicheProduitChimiqueService } from './fiche-produit-chimique.service';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'jhi-fiche-produit-chimique',
    templateUrl: './fiche-produit-chimique.component.html'
})
export class FicheProduitChimiqueComponent implements OnInit, OnDestroy {
    ficheProduitChimiques: IFicheProduitChimique[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private cols: ({ field: string; header: string })[];
    CasSelect: SelectItem[];
    NomSelect: SelectItem[];
    AcronymeSelect: SelectItem[];
    MmSelect: SelectItem[];
    CodeNacreSelect: SelectItem[];

    constructor(
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ficheProduitChimiqueService.query().subscribe(
            (res: HttpResponse<IFicheProduitChimique[]>) => {
                this.ficheProduitChimiques = res.body;
                this.CasSelect = [];
                this.NomSelect = [];
                this.AcronymeSelect = [];
                this.MmSelect = [];
                this.CodeNacreSelect = [];

                for (let value of this.ficheProduitChimiques) {
                    console.log('sully ' + value.acronyme + ' bool ');
                    console.log(this.AcronymeSelect.indexOf({ label: 'Paracétamol', value: 'Paracétamol' }));

                    if (value !== undefined) {
                        if (
                            value.cas !== undefined &&
                            this.CasSelect.indexOf({
                                label: value.cas,
                                value: value.cas
                            }) === -1
                        ) {
                            this.CasSelect.push({ label: value.cas, value: value.cas });
                        }

                        if (
                            value.nom !== undefined &&
                            this.NomSelect.indexOf({
                                label: value.nom,
                                value: value.nom
                            }) === -1
                        ) {
                            this.NomSelect.push({ label: value.nom, value: value.nom });
                        }
                        if (
                            value.acronyme !== undefined &&
                            !this.AcronymeSelect.includes({ label: value.acronyme, value: value.acronyme })
                        ) {
                            this.AcronymeSelect.push({ label: value.acronyme, value: value.acronyme });
                        }
                        if (
                            value.mm !== undefined &&
                            this.MmSelect.indexOf({
                                label: value.mm,
                                value: value.mm
                            }) === -1
                        ) {
                            this.MmSelect.push({ label: value.mm, value: value.mm });
                        }
                        if (
                            value.codeNacre !== undefined &&
                            this.CodeNacreSelect.indexOf({
                                label: value.codeNacre,
                                value: value.codeNacre
                            }) === -1
                        ) {
                            this.CodeNacreSelect.push({ label: value.codeNacre, value: value.codeNacre });
                        }
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheProduitChimiques();
        this.cols = [
            { field: 'cas', header: 'cas' },
            { field: 'nom', header: 'nom' },
            { field: 'acronyme', header: 'acronyme' },
            { field: 'mm', header: 'mm' },
            { field: 'codeNacre', header: 'codeNacre' }
        ];
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFicheProduitChimique) {
        return item.id;
    }

    registerChangeInFicheProduitChimiques() {
        this.eventSubscriber = this.eventManager.subscribe('ficheProduitChimiqueListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
