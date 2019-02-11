import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';
import { FicheRetourProduitService } from './fiche-retour-produit.service';

@Component({
    selector: 'jhi-fiche-retour-produit-delete-dialog',
    templateUrl: './fiche-retour-produit-delete-dialog.component.html'
})
export class FicheRetourProduitDeleteDialogComponent {
    ficheRetourProduit: IFicheRetourProduit;

    constructor(
        protected ficheRetourProduitService: FicheRetourProduitService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ficheRetourProduitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ficheRetourProduitListModification',
                content: 'Deleted an ficheRetourProduit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fiche-retour-produit-delete-popup',
    template: ''
})
export class FicheRetourProduitDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheRetourProduit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheRetourProduitDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ficheRetourProduit = ficheRetourProduit;
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
