import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';
import { FicheEmpruntProduitService } from './fiche-emprunt-produit.service';

@Component({
    selector: 'jhi-fiche-emprunt-produit-delete-dialog',
    templateUrl: './fiche-emprunt-produit-delete-dialog.component.html'
})
export class FicheEmpruntProduitDeleteDialogComponent {
    ficheEmpruntProduit: IFicheEmpruntProduit;

    constructor(
        protected ficheEmpruntProduitService: FicheEmpruntProduitService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ficheEmpruntProduitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ficheEmpruntProduitListModification',
                content: 'Deleted an ficheEmpruntProduit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fiche-emprunt-produit-delete-popup',
    template: ''
})
export class FicheEmpruntProduitDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheEmpruntProduit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheEmpruntProduitDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ficheEmpruntProduit = ficheEmpruntProduit;
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
