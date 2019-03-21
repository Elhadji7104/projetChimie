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
    formuleSelect: SelectItem[];

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
                this.formuleSelect = [];

                for (let value of this.ficheProduitChimiques) {
                    if (value !== undefined) {
                        if (value.cas !== undefined && this.verifiDoublon(value.cas, this.CasSelect)) {
                            this.CasSelect.push({ label: value.cas, value: value.cas });
                        }

                        if (value.nom !== undefined && this.verifiDoublon(value.nom, this.NomSelect)) {
                            this.NomSelect.push({ label: value.nom, value: value.nom });
                        }
                        if (value.acronyme !== undefined && this.verifiDoublon(value.acronyme, this.AcronymeSelect)) {
                            this.AcronymeSelect.push({ label: value.acronyme, value: value.acronyme });
                        }
                        if (value.mm !== undefined && this.verifiDoublon(value.mm, this.MmSelect)) {
                            this.MmSelect.push({ label: value.mm, value: value.mm });
                        }
                        if (value.codeNacre !== undefined && this.verifiDoublon(value.codeNacre, this.CodeNacreSelect)) {
                            this.CodeNacreSelect.push({ label: value.codeNacre, value: value.codeNacre });
                        }
                        if (value.formule !== undefined && this.verifiDoublon(value.formule, this.formuleSelect)) {
                            this.formuleSelect.push({ label: value.formule, value: value.formule });
                        }
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    verifiDoublon(label: string, Select: SelectItem[]) {
        for (let value of Select) {
            if (value.label === label) {
                return false;
            }
        }
        return true;
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheProduitChimiques();
        this.cols = [
            { field: 'cas', header: 'CAS' },
            { field: 'nom', header: 'Nom' },
            { field: 'acronyme', header: 'Acronyme' },
            { field: 'mm', header: 'MM' },
            { field: 'codeNacre', header: 'Code Nacre' },
            { field: 'formule', header: 'Formule Brute' }
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
