import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDocument } from 'app/shared/model/document.model';
import { AccountService } from 'app/core';
import { DocumentService } from './document.service';

@Component({
    selector: 'jhi-document',
    templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy {
    documents: IDocument[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected documentService: DocumentService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.documentService.query().subscribe(
            (res: HttpResponse<IDocument[]>) => {
                this.documents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocument) {
        return item.id;
    }

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('documentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
