import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';
import { MailGestionnaireService } from './mail-gestionnaire.service';

@Component({
    selector: 'jhi-mail-gestionnaire-delete-dialog',
    templateUrl: './mail-gestionnaire-delete-dialog.component.html'
})
export class MailGestionnaireDeleteDialogComponent {
    mailGestionnaire: IMailGestionnaire;

    constructor(
        protected mailGestionnaireService: MailGestionnaireService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mailGestionnaireService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mailGestionnaireListModification',
                content: 'Deleted an mailGestionnaire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mail-gestionnaire-delete-popup',
    template: ''
})
export class MailGestionnaireDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mailGestionnaire }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MailGestionnaireDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mailGestionnaire = mailGestionnaire;
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
