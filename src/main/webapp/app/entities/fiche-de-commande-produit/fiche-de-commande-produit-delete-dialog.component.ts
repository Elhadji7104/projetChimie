import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';
import { FicheDeCommandeProduitService } from './fiche-de-commande-produit.service';

@Component({
    selector: 'jhi-fiche-de-commande-produit-delete-dialog',
    templateUrl: './fiche-de-commande-produit-delete-dialog.component.html'
})
export class FicheDeCommandeProduitDeleteDialogComponent {
    ficheDeCommandeProduit: IFicheDeCommandeProduit;

    constructor(
        protected ficheDeCommandeProduitService: FicheDeCommandeProduitService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ficheDeCommandeProduitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ficheDeCommandeProduitListModification',
                content: 'Deleted an ficheDeCommandeProduit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fiche-de-commande-produit-delete-popup',
    template: ''
})
export class FicheDeCommandeProduitDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheDeCommandeProduit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheDeCommandeProduitDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ficheDeCommandeProduit = ficheDeCommandeProduit;
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
