import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { FicheArticleService } from './fiche-article.service';

@Component({
    selector: 'jhi-fiche-article-delete-dialog',
    templateUrl: './fiche-article-delete-dialog.component.html'
})
export class FicheArticleDeleteDialogComponent {
    ficheArticle: IFicheArticle;

    constructor(
        protected ficheArticleService: FicheArticleService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ficheArticleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ficheArticleListModification',
                content: 'Deleted an ficheArticle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fiche-article-delete-popup',
    template: ''
})
export class FicheArticleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheArticle }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheArticleDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ficheArticle = ficheArticle;
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
