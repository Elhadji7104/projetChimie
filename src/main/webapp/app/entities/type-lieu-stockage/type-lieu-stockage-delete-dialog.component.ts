import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';
import { TypeLieuStockageService } from './type-lieu-stockage.service';

@Component({
    selector: 'jhi-type-lieu-stockage-delete-dialog',
    templateUrl: './type-lieu-stockage-delete-dialog.component.html'
})
export class TypeLieuStockageDeleteDialogComponent {
    typeLieuStockage: ITypeLieuStockage;

    constructor(
        protected typeLieuStockageService: TypeLieuStockageService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typeLieuStockageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'typeLieuStockageListModification',
                content: 'Deleted an typeLieuStockage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-type-lieu-stockage-delete-popup',
    template: ''
})
export class TypeLieuStockageDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ typeLieuStockage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TypeLieuStockageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.typeLieuStockage = typeLieuStockage;
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
