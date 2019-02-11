import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';
import { ListeGroupeInviteService } from './liste-groupe-invite.service';
import { IGroupe } from 'app/shared/model/groupe.model';
import { GroupeService } from 'app/entities/groupe';

@Component({
    selector: 'jhi-liste-groupe-invite-update',
    templateUrl: './liste-groupe-invite-update.component.html'
})
export class ListeGroupeInviteUpdateComponent implements OnInit {
    listeGroupeInvite: IListeGroupeInvite;
    isSaving: boolean;

    groupes: IGroupe[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected listeGroupeInviteService: ListeGroupeInviteService,
        protected groupeService: GroupeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ listeGroupeInvite }) => {
            this.listeGroupeInvite = listeGroupeInvite;
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
        if (this.listeGroupeInvite.id !== undefined) {
            this.subscribeToSaveResponse(this.listeGroupeInviteService.update(this.listeGroupeInvite));
        } else {
            this.subscribeToSaveResponse(this.listeGroupeInviteService.create(this.listeGroupeInvite));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IListeGroupeInvite>>) {
        result.subscribe((res: HttpResponse<IListeGroupeInvite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
