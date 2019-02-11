import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';
import { ListeGroupeInviteService } from './liste-groupe-invite.service';

@Component({
    selector: 'jhi-liste-groupe-invite-delete-dialog',
    templateUrl: './liste-groupe-invite-delete-dialog.component.html'
})
export class ListeGroupeInviteDeleteDialogComponent {
    listeGroupeInvite: IListeGroupeInvite;

    constructor(
        protected listeGroupeInviteService: ListeGroupeInviteService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.listeGroupeInviteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'listeGroupeInviteListModification',
                content: 'Deleted an listeGroupeInvite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-liste-groupe-invite-delete-popup',
    template: ''
})
export class ListeGroupeInviteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listeGroupeInvite }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ListeGroupeInviteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.listeGroupeInvite = listeGroupeInvite;
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
