import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { FicheProduitChimiqueService } from './fiche-produit-chimique.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import * as jsPDF from 'jspdf';

@Component({
    selector: 'jhi-fiche-produit-chimique-print-dialog',
    templateUrl: './fiche-produit-chimique-print-dialog.component.html',
    styles: []
})
export class FicheProduitChimiquePrintDialogComponent implements OnInit {
    ficheProduitChimique: IFicheProduitChimique;
    ficheProduitChimiques: IFicheProduitChimique[];
    CasSelect: SelectItem[];
    NomSelect: SelectItem[];
    AcronymeSelect: SelectItem[];
    MmSelect: SelectItem[];
    CodeNacreSelect: SelectItem[];
    formuleSelect: SelectItem[];
    csvString = 'cas;nom;acronyme;mm;codeNacre;formule \n ';

    constructor(
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        protected jhiAlertService: JhiAlertService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }
    printCsv() {
        var a = document.createElement('a');

        if (window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(this.csvString))], {
                type: 'text/csv;charset=utf-8;'
            });
            navigator.msSaveBlob(blob, 'Produit_Chimique.csv');
        } else {
            a.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(this.csvString);
            a.target = '_blank';
            a.download = 'Produit_Chimique.csv';
            document.body.appendChild(a);
            a.click();
        }

        this.activeModal.dismiss('cancel');
    }
    printPdf() {
        var doc = new jsPDF();
        doc.text(this.csvString, 10, 10);
        doc.save('Produit_Chimique.pdf');
        this.activeModal.dismiss('cancel');
    }

    ngOnInit() {
        this.loadAll();
    }

    // methode récupération de toutes les données des fiches produits
    loadAll() {
        this.ficheProduitChimiqueService.query().subscribe(
            (res: HttpResponse<IFicheProduitChimique[]>) => {
                this.ficheProduitChimiques = res.body;

                this.createCsvFile();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    verifiDoublon(label: string, Select: SelectItem[]) {
        for (const value of Select) {
            if (value.label === label) {
                return false;
            }
        }
        return true;
    }

    // create CSV file
    private createCsvFile() {
        for (const value of this.ficheProduitChimiques) {
            if (value !== undefined) {
                this.csvString +=
                    value.cas +
                    ';' +
                    value.nom +
                    ';' +
                    value.acronyme +
                    ';' +
                    value.mm +
                    ';' +
                    value.codeNacre +
                    ';' +
                    value.formule +
                    '\n';
            }
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

@Component({
    selector: 'jhi-fiche-produit-chimique-print-popup',
    template: ''
})
export class FicheProduitChimiquePrintPopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheProduitChimique }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheProduitChimiquePrintDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ficheProduitChimique = ficheProduitChimique;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
