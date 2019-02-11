import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListeCmr } from 'app/shared/model/liste-cmr.model';
import { ListeCmrService } from './liste-cmr.service';

@Component({
    selector: 'jhi-liste-cmr-delete-dialog',
    templateUrl: './liste-cmr-delete-dialog.component.html'
})
export class ListeCmrDeleteDialogComponent {
    listeCmr: IListeCmr;

    constructor(protected listeCmrService: ListeCmrService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.listeCmrService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'listeCmrListModification',
                content: 'Deleted an listeCmr'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-liste-cmr-delete-popup',
    template: ''
})
export class ListeCmrDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listeCmr }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ListeCmrDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.listeCmr = listeCmr;
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
