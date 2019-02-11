import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListeMotsCles } from 'app/shared/model/liste-mots-cles.model';
import { ListeMotsClesService } from './liste-mots-cles.service';

@Component({
    selector: 'jhi-liste-mots-cles-delete-dialog',
    templateUrl: './liste-mots-cles-delete-dialog.component.html'
})
export class ListeMotsClesDeleteDialogComponent {
    listeMotsCles: IListeMotsCles;

    constructor(
        protected listeMotsClesService: ListeMotsClesService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.listeMotsClesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'listeMotsClesListModification',
                content: 'Deleted an listeMotsCles'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-liste-mots-cles-delete-popup',
    template: ''
})
export class ListeMotsClesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listeMotsCles }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ListeMotsClesDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.listeMotsCles = listeMotsCles;
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
