import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';
import { MailGestionnaireService } from './mail-gestionnaire.service';
import { IGroupe } from 'app/shared/model/groupe.model';
import { GroupeService } from 'app/entities/groupe';

@Component({
    selector: 'jhi-mail-gestionnaire-update',
    templateUrl: './mail-gestionnaire-update.component.html'
})
export class MailGestionnaireUpdateComponent implements OnInit {
    mailGestionnaire: IMailGestionnaire;
    isSaving: boolean;

    groupes: IGroupe[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mailGestionnaireService: MailGestionnaireService,
        protected groupeService: GroupeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mailGestionnaire }) => {
            this.mailGestionnaire = mailGestionnaire;
        });
        this.groupeService.query().subscribe(
            (res: HttpResponse<IGroupe[]>) => {
                this.groupes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mailGestionnaire.id !== undefined) {
            this.subscribeToSaveResponse(this.mailGestionnaireService.update(this.mailGestionnaire));
        } else {
            this.subscribeToSaveResponse(this.mailGestionnaireService.create(this.mailGestionnaire));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMailGestionnaire>>) {
        result.subscribe((res: HttpResponse<IMailGestionnaire>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGroupeById(index: number, item: IGroupe) {
        return item.id;
    }
}
