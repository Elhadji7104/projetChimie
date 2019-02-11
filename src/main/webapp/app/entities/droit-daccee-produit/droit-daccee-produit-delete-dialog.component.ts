import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';
import { DroitDacceeProduitService } from './droit-daccee-produit.service';

@Component({
    selector: 'jhi-droit-daccee-produit-delete-dialog',
    templateUrl: './droit-daccee-produit-delete-dialog.component.html'
})
export class DroitDacceeProduitDeleteDialogComponent {
    droitDacceeProduit: IDroitDacceeProduit;

    constructor(
        protected droitDacceeProduitService: DroitDacceeProduitService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.droitDacceeProduitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'droitDacceeProduitListModification',
                content: 'Deleted an droitDacceeProduit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-droit-daccee-produit-delete-popup',
    template: ''
})
export class DroitDacceeProduitDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ droitDacceeProduit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DroitDacceeProduitDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.droitDacceeProduit = droitDacceeProduit;
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
