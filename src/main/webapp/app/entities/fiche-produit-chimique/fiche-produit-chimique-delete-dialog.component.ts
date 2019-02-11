import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';
import { FicheProduitChimiqueService } from './fiche-produit-chimique.service';

@Component({
    selector: 'jhi-fiche-produit-chimique-delete-dialog',
    templateUrl: './fiche-produit-chimique-delete-dialog.component.html'
})
export class FicheProduitChimiqueDeleteDialogComponent {
    ficheProduitChimique: IFicheProduitChimique;

    constructor(
        protected ficheProduitChimiqueService: FicheProduitChimiqueService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ficheProduitChimiqueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ficheProduitChimiqueListModification',
                content: 'Deleted an ficheProduitChimique'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fiche-produit-chimique-delete-popup',
    template: ''
})
export class FicheProduitChimiqueDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheProduitChimique }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheProduitChimiqueDeleteDialogComponent as Component, {
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
