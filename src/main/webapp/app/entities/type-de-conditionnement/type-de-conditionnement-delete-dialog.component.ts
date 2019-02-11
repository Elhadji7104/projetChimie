import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';
import { TypeDeConditionnementService } from './type-de-conditionnement.service';

@Component({
    selector: 'jhi-type-de-conditionnement-delete-dialog',
    templateUrl: './type-de-conditionnement-delete-dialog.component.html'
})
export class TypeDeConditionnementDeleteDialogComponent {
    typeDeConditionnement: ITypeDeConditionnement;

    constructor(
        protected typeDeConditionnementService: TypeDeConditionnementService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typeDeConditionnementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'typeDeConditionnementListModification',
                content: 'Deleted an typeDeConditionnement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-type-de-conditionnement-delete-popup',
    template: ''
})
export class TypeDeConditionnementDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ typeDeConditionnement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TypeDeConditionnementDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.typeDeConditionnement = typeDeConditionnement;
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
